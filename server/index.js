// Replace import statements with require
const { app_firebase, db_firestore, auth } = require("./firebase");
const { collection, getDocs, query, orderBy, where, limit, doc, updateDoc, getDoc } = require('firebase/firestore');
const { getStorage, ref, getDownloadURL, listAll, getMetadata, } = require('firebase/storage');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { getAuth, signInWithEmailAndPassword, signOut, EmailAuthProvider, reauthenticateWithCredential } = require("firebase/auth");

const cors = require('cors');
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Sign in the user with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Retrieve the signed-in user
        const user = auth.currentUser;
        console.log("from signin: ", user.email)
        // const user = userCredential.user;
        // console.log("from signin: ", user)
        // Respond with user data or a success message
        res.status(200).json({ user });
    } catch (error) {
        // Handle sign-in errors
        console.error("Error signing in user:", error);
        res.status(400).json({ error: "Failed to sign in user" });
    }
});

app.post('/api/signout', async (req, res) => {
    try {
        // Sign out the user
        signOut(auth)

        // Respond with a success message
        res.status(200).json({ message: "User signed out successfully" });
    } catch (error) {
        // Handle sign-out errors
        console.error("Error signing out user:", error);
        res.status(500).json({ error: "Failed to sign out user" });
    }
});

app.get('/api/check-auth', async (req, res) => {
    try {
        const user = auth.currentUser;
        if (user != null) {
            res.status(200).json({ message: "User already signed in" });
        } else {
            res.status(401).json({ message: "No user signed in" });
        }
    } catch (error) {
        // Handle errors
        console.error("Error checking authentication:", error);
        res.status(500).json({ error: "Failed to check authentication" });
    }
});

app.get('/api/all_videos', async (req, res) => {
    try {
        const storage = getStorage();
        const thumbnailsFolderRef = ref(storage, 'Thumbnail');

        const [thumbnailsList] = await Promise.all([
            listAll(thumbnailsFolderRef),
        ]);

        const videoDataAll = [];

        for (const thumbnails of thumbnailsList.items) {
            try {
                const fileName = thumbnails.name.split('/').pop();
                const downloadURL = await getDownloadURL(thumbnails);
                const metadata = await getMetadata(thumbnails);
                const createdTimeString = metadata.timeCreated;
                const dateTime = new Date(createdTimeString);
                const createdTime = dateTime.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                });

                const thumbnailFileJPG = thumbnailsList.items.find(
                    (thumbnailItem) =>
                        thumbnailItem._location.path_.endsWith(`/${fileName.replace(/\.[^/.]+$/, '.jpg')}`)
                );

                const thumbnailFilePNG = thumbnailsList.items.find(
                    (thumbnailItem) =>
                        thumbnailItem._location.path_.endsWith(`/${fileName.replace(/\.[^/.]+$/, '.png')}`)
                );

                let thumbnailURL = null;

                if (thumbnailFileJPG) {
                    thumbnailURL = await getDownloadURL(thumbnailFileJPG);
                } else if (thumbnailFilePNG) {
                    thumbnailURL = await getDownloadURL(thumbnailFilePNG);
                }

                videoDataAll.push({
                    fileName,
                    downloadURL,
                    createdTime,
                    thumbnailURL,
                });
            } catch (error) {
                console.error('Error processing video item:', error);
                // Log or send more informative response to the client
            }
        }

        res.json(videoDataAll);
    } catch (error) {
        console.error('Error fetching video data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/all_videos_url', async (req, res) => {
    try {
        const storage = getStorage();
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
                    hour12: false,
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

app.get('/api/all_videos_url_test', async (req, res) => {
    try {
        const storage = getStorage();
        const videosRef = ref(storage, 'Abnormal_Videos');

        const videoList = await listAll(videosRef);

        // Query Firestore for RFID records
        const querySnapshot = await getDocs(
            query(
                collection(db_firestore, 'RFID_Record'),
                orderBy('TimeInOut', 'desc'),
            )
        );
        console.log(querySnapshot)
        const videoData = [];

        for (const videoItem of videoList.items) {
            try {
                // Extract date and time from the video file name
                const videoFileName = videoItem.name.replace('.mp4', "");
                // Find a matching document in Firestore based on the extracted date and time
                const matchingRecord = querySnapshot.docs.find(doc => {
                    const docFileNameParts = doc.id.split(" ")[0];
                    const docTimeArray = doc.id.split(" ")[1].split(".");
                    const docTime = docTimeArray[0] + "." + docTimeArray[1] + "." + docTimeArray[2]
                    const docFileName = docFileNameParts + " " + docTime
                    const docName = doc.id;
                    return videoFileName === docFileName;

                });

                if (matchingRecord) {

                    console.log("match name", matchingRecord.data())
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
                        hour12: true,
                    });

                    // Add the relevant information to the response array
                    videoData.push({
                        fileName: videoFileName,
                        docName: matchingRecord.id,
                        downloadURL,
                        createdTime,
                        name: matchingRecord.data().FnameT + "  " + matchingRecord.data().LnameT,
                        UID: matchingRecord.data().PersonCardID,
                        status: matchingRecord.data().Status,
                        timeInOut: new Date(matchingRecord.data().TimeInOut).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false,
                        }),
                        event: matchingRecord.data().Event,
                        Note: matchingRecord.data().Note
                        // Add additional fields from the matching RFID record if needed
                        // Example: additionalField: matchingRecord.data().additionalField
                    });
                }
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

// API endpoint to update the Note field in Firestore
app.put('/api/updateNote/RFID_Record/:document', async (req, res) => {
    try {
        const { document } = req.params;
        const decodedDocument = decodeURIComponent(document);
        const { Note, Password } = req.body;
        console.log(Note, Password);

        const user = auth.currentUser;
        console.log("user",user)
        if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            const Email = user.email;
            console.log(Email);
            console.log(Password);

            try {
                // Create a credential using the user's email and the provided password
                const credential = EmailAuthProvider.credential(
                    Email,
                    Password
                );

                // Re-authenticate the user with the provided credential
                await reauthenticateWithCredential(user, credential);

                // If reauthentication succeeds, proceed with updating the note
                const docRef = doc(db_firestore, "RFID_Record", decodedDocument);

                // Get the current document data
                const docSnap = await getDoc(docRef);
                // Update the Note field in the document
                
                if (!docSnap.exists()) {
                    return res.status(404).json({ success: false, message: 'Document not found' });
                }
                await updateDoc(docRef, { Note, Status: "Clarified"});
                console.log("update scuessfully",Note)
                res.status(200).json({ success: true, message: 'Note updated successfully content: ' + Note });
            } catch (reauthError) {
                console.error('Error re-authenticating user:', reauthError);
                return res.status(401).json({ success: false, message: 'Failed to re-authenticate user' });
            }
        } else {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ success: false, message: error });
    }
});




app.get('/api/rfid_record', async (req, res) => {
    try {
        // Initialize Firestore

        // Retrieve data from the collection
        const queryRfid_record = await getDocs(
            query(
                collection(db_firestore, 'RFID_Record'),
                orderBy('TimeInOut', 'desc'),
            )
        );

        const tableData = [];

        queryRfid_record.forEach((doc) => {
            console.log(doc.data())
            tableData.push({
                picture: "/images/default_profile.jpg",
                name: doc.data().FnameT + "  " + doc.data().LnameT,
                UID: doc.data().PersonCardID,
                Status: doc.data().Status,
                TimeInOut: new Date(doc.data().TimeInOut).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                }),
            });
        });

        res.json(tableData);
    } catch (error) {
        console.error("Error retrieving RFID records:", error);
        res.status(500).json({ error: "Failed to retrieve RFID records" });
    }
});

app.get('/api/rfid_record_Dashboard', async (req, res) => {
    try {
        // Initialize Firestore

        // Retrieve data from the collection
        const queryRfid_record = await getDocs(
            query(
                collection(db_firestore, 'RFID_Record'),
                orderBy('TimeInOut', 'desc'),
                limit(5)
            )
        );

        const tableData = [];

        queryRfid_record.forEach((doc) => {
            console.log(doc.data())
            tableData.push({
                picture: "/images/default_profile.jpg",
                name: doc.data().FnameT + "  " + doc.data().LnameT,
                Status: doc.data().Status,
                TimeInOut: new Date(doc.data().TimeInOut).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                }),
            });
        });

        res.json(tableData);
    } catch (error) {
        console.error("Error retrieving RFID records:", error);
        res.status(500).json({ error: "Failed to retrieve RFID records" });
    }
});

app.get('/api/rfid_record_counts', async (req, res) => {
    try {
        const coll = collection(db_firestore, 'RFID_Record')


        // Query for Abnormal count
        const qAbnormal = query(coll, where("Status", "==", "Abnormal"));
        const snapshotAbnormal = await getDocs(qAbnormal);
        const countAbnormal = snapshotAbnormal.size;

        // Query for Check-in count
        const qCheckInOut = query(coll, where("Status", "in", ["Check-in", "Check-out"]));
        const snapshotCheckInOut = await getDocs(qCheckInOut);
        const countCheckInOut = snapshotCheckInOut.size;

        // Query for Check-out count
        const qClarified = query(coll, where("Status", "==", "Clarified"));
        const snapshotClarified = await getDocs(qClarified);
        const countClarified = snapshotClarified.size;

        const counts = {
            Abnormal: countAbnormal,
            CheckInOut: countCheckInOut,
            Clarified: countClarified
        };

        res.json(counts);
    } catch (error) {
        console.error("Error retrieving RFID records:", error);
        res.status(500).json({ error: "Failed to retrieve RFID records" });
    }
});

app.listen('8080', "0.0.0.0", () => {
    console.log('server is running');
})


