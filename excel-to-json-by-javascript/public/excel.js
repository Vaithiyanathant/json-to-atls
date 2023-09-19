
let selectedFile;

document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
});

let data = [{
    "name": "vaithi",
    "data": "ssdn",
    "abc": "sdd"
}];

let jsonData;

document.getElementById('button').addEventListener("click", () => {
    if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                console.log(rowObject);

                // Convert rowObject to a JSON string
                jsonData = JSON.stringify(rowObject, undefined, 4);

                // Create a Blob containing the JSON data
                let blob = new Blob([jsonData], { type: 'application/json' });
                // Create a link element to trigger the download
                let a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'exported_data.json';
                

                fetch("/success", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ jsonData }) // Sending JSON data as the body
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    window.location.href = "/success";
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            

                // Trigger a click event to download the JSON file
                a.click();
                
            });
        }
    }
});




