// Replace import statements with require
const { app_firebase, db_firestore } = require("./firebase");
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const { getStorage, ref, getDownloadURL, listAll, getMetadata } = require('firebase/storage');

const mysql = require('mysql');
const cors = require('cors');
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    "user": "root",
    "host": "localhost",
    "password": "",
    "database": "capstone"
});

app.get('/users', (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get('/saleorder', (req, res) => {
    db.query("select * FROM saleOrder", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }

    })
});



app.get('/historys', (req, res) => {
    db.query("SELECT * FROM history", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get('/historys-users', (req, res) => {
    db.query("SELECT h.Date, h.Time, h.UID_Card, h.Status, u.Name, u.Position FROM history AS h LEFT JOIN user AS u ON h.UID_Card = u.UID_Card ORDER BY h.Date DESC, h.Time DESC", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.post('/register', (req, res) => {
    const email = req.body.email;
    const Name = req.body.Name;
    const Surname = req.body.Surname;
    const password = req.body.password;
    const Id = req.body.Id;

    db.query("INSERT INTO user VALUE (?,?,?,?,?)", [email, Name, Surname, , password, Id],
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Registered completed");
            }
        })
})

app.get('/api/all_videos', async (req, res) => {
    try {
        const storage = getStorage(app_firebase);
        const videosRef = ref(storage, 'Video');
        const thumbnailsFolderRef = ref(storage, 'Thumbnail'); // Add reference to the Thumbnail folder

        const [videoList, thumbnailsList] = await Promise.all([
            listAll(videosRef),
            listAll(thumbnailsFolderRef),
        ]);

        const videoData = [];

        for (const videoItem of videoList.items) {
            try {
                // Extract file name from the full path
                const fileName = videoItem.name.split('/').pop();
                
                // Generate the download URL
                const downloadURL = await getDownloadURL(videoItem);

                // Get storage metadata
                const metadata = await getMetadata(videoItem);
                const createdTimeString = metadata.timeCreated;
                const dateTime = new Date(createdTimeString);

                // Format the date and time for Thai locale
                const createdTime = dateTime.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                });
                
                // Find the corresponding thumbnail for the video
                const thumbnailFileJPG = thumbnailsList.items.find(
                    (thumbnailItem) =>
                      thumbnailItem._location.path_.endsWith(`/${fileName.replace(/\.[^/.]+$/, '.jpg')}`)
                  );
                  
                  // Find the corresponding PNG thumbnail for the video
                  const thumbnailFilePNG = thumbnailsList.items.find(
                    (thumbnailItem) =>
                      thumbnailItem._location.path_.endsWith(`/${fileName.replace(/\.[^/.]+$/, '.png')}`)
                  );

                const lFileJPG = videoList.items.find(
                    (videoList) =>
                    videoList.name.endsWith(`/${fileName.replace(/\.[^/.]+$/, '.mp4')}`)
                );
                console.log('Thumbnail file (JPG):', thumbnailFileJPG);
                console.log('Thumbnail file (PNG):', thumbnailFilePNG);

                // If a matching thumbnail is found, generate the thumbnail URL
                let thumbnailURL = null;

                if (thumbnailFileJPG) {
                    console.log(thumbnailFileJPG)
                    thumbnailURL = await getDownloadURL(thumbnailFileJPG);
                } else if (thumbnailFilePNG) {
                    console.log(thumbnailFilePNG)
                    thumbnailURL = await getDownloadURL(thumbnailFilePNG);
                }


                // Add the relevant information to the response array
                videoData.push({
                    fileName,
                    downloadURL,
                    createdTime,
                    thumbnailURL, // Add thumbnail URL to the response
                });
            } catch (error) {
                console.error('Error processing video item:', error);
            }
        }

        res.json(videoData);
    } catch (error) {
        console.error('Error fetching video data:', error);
        res.status(500).send('Internal Server Error');
    }
});




app.listen('8080', "0.0.0.0", () => {
    console.log('server is running');
})


