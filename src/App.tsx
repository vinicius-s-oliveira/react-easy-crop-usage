import React, { useEffect, useState } from "react";
import "./App.css";
import Cropper, { Area } from "react-easy-crop";

function App() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  useEffect(() => {
    console.log("image:", image);
  }, [image]);

  return (
    <React.Fragment>
      <header />
      <div className="body">
        <div className="container">
          <div className="step"></div>

          <div className="content">
            <div className="description">
              <p>
                Selecione um arquivo de imagem jpg/jpeg ou png com tamanho menor
                que 00mb e tamanho mínimo de 500 - 500 px para fazer upload.
              </p>
            </div>
            <div className="crop">Image Content</div>
            <div className="preview">
              Preview
              {preview ? (
                <img src="./src/assets/earth.jpg" alt="earth" />
              ) : (
                <div>No preview inserted</div>
              )}
            </div>
          </div>

          <div className="buttons">
            <div className="addButton">
              <label htmlFor="upload">Adicionar imagem</label>

              <input
                id="upload"
                type="file"
                onChange={() => {}}
                accept="image/*"
              />
            </div>

            <div className="actionButtons">
              <button>Cancelar</button>
              <button>Continuar</button>
            </div>
          </div>
        </div>

        {/* <div className="imageContainer">
        <img src="./src/assets/earth.jpg" alt="earth" />
        <button onClick={() => setImage("./src/assets/earth.jpg")}>Crop</button>
      </div>

      <div className="imageContainer">
        <img src="./src/assets/red-mountains.jpg" alt="earth" />
        <button onClick={() => setImage("./src/assets/red-mountains.jpg")}>
          Crop
        </button>
      </div> */}
        {/* <div className="crop">
        <Cropper
          image="./src/assets/red-mountains.jpg"
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div> */}
        {/* {image && (
        <div style={{ position: "absolute", backgroundColor: "blue" }}>
          <Cropper
            image='./src/assets/red-mountains.jpg'
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      )} */}
      </div>
    </React.Fragment>
  );
}

export default App;
