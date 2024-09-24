import { useState } from "react";

function ImageSection({ images }) {
  const [currentImage, setCurrentImage] = useState(images?.[0]);

  // handler to set current image
  function handleMouseEnter(image) {
    setCurrentImage(image);
  }

  return (
    <div className="flex gap-2">
      {/*side images*/}
      <div className="flex flex-col gap-2">
        {images?.map((image) => {
          return (
            <img
              key={crypto.randomUUID()}
              src={image}
              alt="Product-image-1"
              className="w-[68px] sm:w-[80px] md:w-[100px] cursor-pointer border p-2 rounded-xl"
              onMouseEnter={() => handleMouseEnter(image)}
            />
          );
        })}
      </div>

      {/*Current image*/}
      <div className="flex flex-col gap-3 lg:w-[440px] lg:h-[440px] ml-2">
        <img
          src={currentImage}
          alt="Product"
          className="w-full h-auto max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] mx-auto rounded-xl object-cover object-top"
        />
      </div>
    </div>
  );
}

export default ImageSection;

/*
Render 2nd image only if it is present
{productData && productData.images && productData.images[1] && (
    <img
      src={productData?.images?.[1]}
      alt="Product-image-2"
      className="w-[68px] cursor-pointer border p-2 rounded-xl"
    />
  )}
    
  Render 3rd image only if it is present*
  {productData?.images?.[2] && (
    <img
      src={productData?.images?.[2]}
      alt="Product-image-3"
      className="w-[68px] cursor-pointer border p-2 rounded-xl"
    />
  )}
*/
