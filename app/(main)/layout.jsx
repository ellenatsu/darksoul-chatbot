import SideBar from "@/components/sidebar";

const MainPageLayout = ({children}) =>{
    return (
      <div className="h-full">
        <div className="fixed insert-y-0 h-full w-0 md:w-60 flex-col invisible md:flex md:visible bg-black">
            <SideBar />
        </div>
        <main className="h-full md:pl-60">
            {children}
        </main>
      </div>
    )
}

export default MainPageLayout;