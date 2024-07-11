import { NextResponse } from "next/server";
import { getVectorStore, queryCollection } from "@/utils/chromadbUtils";
import { ChatGroq } from "@langchain/groq";
import * as hub from "langchain/hub";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

//here we have one query
//1. take parse the query
//2. search query in databse for relevant data
//give the relevant data chunks to AI model and generate response
//3. create a prompt
//4. sent it and get response

export async function GET(req) {
  //use groq to run llama-3 model
  const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: process.env.GROQ_MODEL_ID,
    temperature: 0
  });

  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    if (!query) {
      return NextResponse.error("Query not found", 400);
    }
   const retrievedDocs = await queryCollection(query);

    console.log("Retrieved documents:", retrievedDocs);

    if (!Array.isArray(retrievedDocs)) {
      console.error("Retrieved documents is not an array");
      return new NextResponse("Internal Error: Retrieved documents is not an array", { status: 500 });
    }
    //get the prompt template
    const prompt = await hub.pull("rlm/rag-prompt");
    //build rag chain
    const ragChain = await createStuffDocumentsChain({
      llm,
      prompt,
      outputParser: new StringOutputParser(),
    });

    //generate response
    const response = await ragChain.invoke({
      question: query,
      context: retrievedDocs,
    })
    return NextResponse.json({ response });

  } catch (e) {
    console.log("[QUERY_GET]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}