// Replace import statements with require
const { app_firebase, db_firestore, auth } = require("./firebase");
const { collection, getDocs, query, orderBy, where, limit, doc, updateDoc, getDoc } = require('firebase/firestore');
const { getStorage, ref, getDownloadURL, listAll, getMetadata, } = require('firebase/storage');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { getAuth, signInWithEmailAndPassword, signOut, EmailAuthProvider, reauthenticateWithCredential } = require("firebase/auth");
const { endOfDay, subDays } = require('date-fns');

const cors = require('cors');
const express = require("express");

const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
  };

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

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
                    timeZone: 'Asia/Bangkok'
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
        const videosRef = ref(storage, 'Abnormal_Videos');
        const thumbnailRef = ref(storage, 'Abnormal_Images');

        const [videoList, thumbnailsList] = await Promise.all([
            listAll(videosRef),
            listAll(thumbnailRef),
        ]);

        // Query Firestore for RFID records ordered by time
        const querySnapshot = await getDocs(
            query(
                collection(db_firestore, 'RFID_Record'),
                orderBy('TimeInOutUTC', 'desc'),
            )
        );

        console.log(querySnapshot)
        const videoDataPromises = [];

        querySnapshot.forEach(doc => {
            const docName = doc.id;

            // Find matching video item
            const matchingVideoItem = videoList.items.find(videoItem => {
                const videoFileName = videoItem.name.replace('.mp4', "");
                return videoFileName === docName;
            });

            if (matchingVideoItem) {
                const videoDataPromise = (async () => {
                    try {
                        console.log("match name", doc.data())
                        // Generate the download URL
                        const downloadURL = await getDownloadURL(matchingVideoItem);

                        // Get storage metadata
                        const metadata = await getMetadata(matchingVideoItem);
                        const createdTimeString = metadata.timeCreated;
                        const dateTime = new Date(createdTimeString);
                        // dateTime.setHours(dateTime.getHours() + 7);
                        // Format the date and time for Thai locale
                        const createdTime = dateTime.toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            timeZone: 'Asia/Bangkok'
                        });
                        const createdTimeTH = dateTime.toLocaleString('th-TH', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false,
                            timeZone: 'Asia/Bangkok'
                        });
                        const fileName = matchingVideoItem.name.split('/').pop();
                        const thumbnailFileJPG = thumbnailsList.items.find(
                            (thumbnailItem) =>
                                thumbnailItem._location.path_.endsWith(`/${fileName.replace(/\.[^/.]+$/, '.jpg')}`)
                        );
                        const thumbnailURL = await getDownloadURL(thumbnailFileJPG);
                        
                        // Return the relevant information
                        return {
                            fileName: docName,
                            docName: doc.id,
                            downloadURL,
                            createdTime,
                            name: doc.data().FnameT + "  " + doc.data().LnameT,
                            UID: doc.data().PersonCardID,
                            status: doc.data().Status,
                            timeInOut: new Date(doc.data().TimeInOut).toLocaleString('th-TH', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false,
                                timeZone: 'Asia/Bangkok'
                            }),
                            event: doc.data().Event,
                            Note: doc.data().Note,
                            thumbnailURL: thumbnailURL ,
                            createdTimeTH: createdTimeTH
                        };
                    } catch (error) {
                        console.error('Error processing document:', error);
                        return null;
                    }
                })();
                videoDataPromises.push(videoDataPromise);
            }
        });

        // Wait for all promises to resolve
        const videoData = await Promise.all(videoDataPromises);

        // Filter out null values (in case of errors during processing)
        const filteredVideoData = videoData.filter(data => data !== null);

        res.json(filteredVideoData);
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
                TimeInOut: new Date(doc.data().TimeInOut).toLocaleString('th-TH', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                    timeZone: 'Asia/Bangkok'
                }),
                Note:doc.data().Note || "-",
            });
        });

        res.json(tableData);
    } catch (error) {
        console.error("Error retrieving RFID records:", error);
        res.status(500).json({ error: "Failed to retrieve RFID records" });
    }
});

app.get('/api/rfid_record_fts', async (req, res) => {
    try {
        // Initialize Firestore

        // Retrieve data from the collection
        const queryRfid_record = await getDocs(
            query(
                collection(db_firestore, 'RFID_Record'),
                where("Event", "==", "This person forgot to scan out when leave Yuanter"),
                orderBy('TimeInOut', 'desc'),
            )
        );

        const tableData = [];

        queryRfid_record.forEach((doc) => {
            console.log(doc.data())
            tableData.push({
                picture: "/images/default_profile.jpg",
                docName: doc.id,
                name: doc.data().FnameT + "  " + doc.data().LnameT,
                UID: doc.data().PersonCardID,
                Status: doc.data().Status,
                TimeInOut: new Date(doc.data().TimeInOut).toLocaleString('th-TH', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                    timeZone: 'Asia/Bangkok'
                }),
                Note:doc.data().Note || "-",
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
                TimeInOut: new Date(doc.data().TimeInOut).toLocaleString('th-TH', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                    timeZone: 'Asia/Bangkok'
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
        const coll = collection(db_firestore, 'RFID_Record');
        const now = new Date();
        
        const lastSevenDays = subDays(endOfDay(now), 7); 
        const qAbnormal = query(coll, 
            where("Status", "==", "Abnormal"),
            where("TimeInOutUTC", ">=", lastSevenDays),
        );
        const snapshotAbnormal = await getDocs(qAbnormal);
        const countAbnormal = snapshotAbnormal.size;

        const qCheckInOut = query(coll, 
            where("Status", "in", ["Check-in", "Check-out"]),
            where("TimeInOutUTC", ">=", lastSevenDays),
        );
        const snapshotCheckInOut = await getDocs(qCheckInOut);
        const countCheckInOut = snapshotCheckInOut.size;

        // Query for Clarified records in the last 7 days
        const qClarified = query(coll, 
            where("Status", "==", "Clarified"),
            where("TimeInOutUTC", ">=", lastSevenDays),
        );
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

app.listen('3002', "0.0.0.0", () => {
    console.log('server is running');
})


