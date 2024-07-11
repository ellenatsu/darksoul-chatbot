import xml.etree.ElementTree as ET
import csv

folder_path = 'data/darksoul3'

def parse_xml(file):
    tree = ET.parse(file)
    root = tree.getroot()
    return {text.get('id'): text.text for text in root.findall('.//text')}

# Parse the XML files
weapon_name = parse_xml(folder_path + '/items/weapon_name.xml')
weapon_desc = parse_xml(folder_path + '/items/weapon_desc.xml')
#weapon_remk = parse_xml(folder_path + '/items/weapon_remk.xml')

# Combine the data
combined_data = []
for id in weapon_name.keys():
    combined_data.append({
        'id': id,
        'name': weapon_name.get(id, ''),
#        'remark': weapon_remk.get(id, ''),
        'description': weapon_desc.get(id, '')
    })

# Write to CSV
with open(folder_path + '/weapon_data.csv', 'w', newline='') as csvfile:
#    fieldnames = ['id', 'name', 'remark', 'description']
    fieldnames = ['id', 'name','description']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    writer.writerows(combined_data)
