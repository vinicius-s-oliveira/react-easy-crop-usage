import React, { useEffect, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

import "./App.css";
import { getCroppedImg } from "./utils";

function App() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageDataUrl = await readFile(file);
      setImage(imageDataUrl);
    }
  };

  useEffect(() => {
    const getCroppedImage = async () => {
      try {
        if (croppedAreaPixels) {
          const croppedImage = await getCroppedImg(image, croppedAreaPixels);
          console.log("donee", { croppedImage });
          setCroppedImage(croppedImage);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCroppedImage();
  }, [croppedAreaPixels, image]);

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

            <div className="crop">
              {image ? (
                <>
                  <div className="cropImage">
                    <Cropper
                      image={image}
                      crop={crop}
                      zoom={zoom}
                      aspect={4 / 3}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                  <div className="controllers">
                    <input
                      value={zoom}
                      type="range"
                      id="volume"
                      name="volume"
                      min={1}
                      max={3}
                      step={0.001}
                      // aria-labelledby="Zoom"
                      onChange={(e) => {
                        setZoom(e.target.value);
                        console.log("onChange > zoom", e.target);
                      }}
                    />
                  </div>
                </>
              ) : (
                <>No image selected</>
              )}
            </div>

            <div className="preview">
              Preview
              {croppedImage ? (
                <img src={croppedImage} alt="cropped" />
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
                onChange={onFileChange}
                accept="image/*"
              />
            </div>

            <div className="actionButtons">
              <button>Cancelar</button>
              <button>Continuar</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
