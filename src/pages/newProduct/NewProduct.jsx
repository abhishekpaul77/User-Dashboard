import { useState } from "react";
import "./newProduct.css";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import app from "../../firebase";
import { createMovie } from "../../context/movieContext/MovieApiCalls";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(MovieContext);

  const storage = getStorage(app);
  const storageRef = ref(storage);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  // const upload = (items) => {
  //   const promises = items.map(async (item) => {
  //     const fileName = new Date().getTime() + item.label + item.files.name;
  //     const itemRef = ref(storageRef, fileName);

  //     return uploadBytes(itemRef, item.files)
  //       .then((snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         return getDownloadURL(itemRef); // Return the download URL
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         throw err; // Propagate the error
  //       });
  //   });
  const upload = (items) => {
    const promises = items.map((item) => {
      const fileName = new Date().getTime() + item.label + item.files.name;
      const itemRef = ref(storageRef, fileName);
  
      return uploadBytes(itemRef, item.files)
        .then((snapshot) => {
          // Listen for the "state_changed" event
          
    const uploadTask = uploadBytesResumable(itemRef, item.files);
          uploadTask.on(
            "state_changed",
            (uploadSnapshot) => {
              // Calculate and display progress
              const progress =
                (uploadSnapshot.bytesTransferred / uploadSnapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.log("Upload error:", error);
              throw error; // Propagate the error
            }
          );
  
          return getDownloadURL(itemRef); // Return the download URL
        })
        .catch((err) => {
          console.log(err);
          throw err; // Propagate the error
        });
    });

    // Wait for all uploads to finish before updating state
    Promise.all(promises)
      .then((urls) => {
        const newMovie = items.reduce((prev, item, index) => {
          return { ...prev, [item.label]: urls[index] };
        }, movie);
        setMovie(newMovie);
        setUploaded((uploaded)=>uploaded + 1);
        console.log(uploaded)
      })
      .catch((error) => {
        console.log("Error during uploads:", error);
      });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    
    upload([
      { files: img, label: "img" },
      { files: imgTitle, label: "imgTitle" },
      { files: imgSm, label: "imgSm" },
      { files: trailer, label: "trailer" },
      { files: video, label: "video" },
    ]);
    setUploaded(0)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
  };

  console.log(movie);
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Movie Title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="Limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Is Serires?</label>
          <select name="active" id="active" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {uploaded !==0 ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
