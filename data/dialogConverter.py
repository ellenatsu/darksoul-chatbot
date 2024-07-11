import xml.etree.ElementTree as ET
import csv
import os


def parse_dialog_xml(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()
    
    dialogs = []
    current_behavior = None
    
    for elem in root.findall('.//text'):
        text_id = elem.get('id')
        text_content = elem.text.strip() if elem.text else ''
        
        if text_id is None:
            # This is a behavior
            current_behavior = text_content
        else:
            # This is a sub-dialogue
            dialogs.append({
                'behavior': current_behavior,
                'subdialogue_id': text_id,
                'subdialogue_text': text_content
            })
    
    return dialogs


def convert_all_dialogues_to_csv(dialogue_folder, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(dialogue_folder):
        if filename.endswith('.xml'):
            file_path = os.path.join(dialogue_folder, filename)
            dialogs = parse_dialog_xml(file_path)
            
            output_csv_path = os.path.join(output_folder, f"{os.path.splitext(filename)[0]}.csv")
            
            with open(output_csv_path, 'w', newline='', encoding='utf-8') as csvfile:
                fieldnames = ['behavior', 'subdialogue_id', 'subdialogue_text']
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)

                writer.writeheader()
                writer.writerows(dialogs)

            print(f"Structured dialog CSV file saved to {output_csv_path}")

# Define paths
dialogue_folder = 'data/darksoul3/dialogue'  # Folder containing NPC XML files
output_folder = 'data/darksoul3/csv_data'  # Folder to save generated CSV files

# Convert all dialogues to CSV
convert_all_dialogues_to_csv(dialogue_folder, output_folder)

# # Path to the uploaded XML file
# dialog_path = folder_path + '/dialogue/andre.xml'

# # Parse the XML file
# dialogs = parse_dialog_xml(dialog_path)

# # Write to CSV
# output_dialog_csv_path = folder_path + '/csv_dialogue/andre_dialog_structured.csv'

# with open(output_dialog_csv_path, 'w', newline='') as csvfile:
#     fieldnames = ['behavior', 'subdialogue_id', 'subdialogue_text']
#     writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

#     writer.writeheader()
#     writer.writerows(dialogs)

# output_dialog_csv_path
