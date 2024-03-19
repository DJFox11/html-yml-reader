document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const contents = e.target.result;
        try {
            const yamlObj = jsyaml.load(contents);
            const outputDiv = document.getElementById('output');

            let kingdoms = "";
            let hasNameRecord = false;
            for (const key in yamlObj) {
                if (yamlObj.hasOwnProperty(key)) {
                    if (typeof yamlObj[key] === 'object' && yamlObj[key] !== null && 'Name' in yamlObj[key]) {
                        // Replace original name with the corresponding replacement
                        const originalName = yamlObj[key]['Name'];
                        const replacedName = getReplacedName(originalName);
                        const imageName = `${originalName}.png`; // assuming the image file extension is .png
                        const imagePath = `images/${imageName}`; // adjust the path as needed
                        kingdoms += `<div class="kingdom">
                                <div class="image" style="background-image: url(${imagePath});"></div>
                                <div class="name">${replacedName}</div>
                             </div>`;
                        hasNameRecord = true;
                    }
                }
            }

            if (!hasNameRecord) {
                outputDiv.innerHTML = "<p>No 'Name' record found in the YAML file.</p>";
            } else {
                outputDiv.innerHTML = kingdoms;
            }
        } catch (error) {
            console.error("Error parsing YAML:", error);
            outputDiv.innerHTML = "<p>Error parsing YAML file.</p>";
        }
    };

    if (file) {
        reader.readAsText(file);
    } else {
        document.getElementById('output').innerHTML = "<p>No file selected.</p>";
    }
});

function getReplacedName(originalName) {
    // Mapping of internal names to kingdom names
    const nameMappings = {
        "CapWorldHomeStage": "Cap Kingdom",
        "WaterfallWorldHomeStage": "Cascade Kingdom",
        "SandWorldHomeStage": "Sand Kingdom",
        "LakeWorldHomeStage": "Lake Kingdom",
        "ForestWorldHomeStage": "Wooded Kingdom",
        "CloudWorldHomeStage": "Cloud Kingdom",
        "ClashWorldHomeStage": "Lost Kingdom",
        "CityWorldHomeStage": "Metro Kingdom",
        "SnowWorldHomeStage": "Snow Kingdom",
        "SeaWorldHomeStage": "Seaside Kingdom",
        "LavaWorldHomeStage": "Luncheon Kingdom",
        "BossRaidWorldHomeStage": "Ruined Kingdom",
        "SkyWorldHomeStage": "Bowser's Kingdom",
        "MoonWorldHomeStage": "Moon Kingdom",
        "PeachWorldHomeStage": "Mushroom Kingdom",
        "Special1WorldHomeStage": "Dark Side",
        "Special2WorldHomeStage": "Darker Side"
    };

    return nameMappings[originalName] || originalName;
}