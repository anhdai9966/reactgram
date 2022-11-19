import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { useBoolean, useDidMountEffect } from "~/hooks";
import {
  IconCrop,
  IconImage,
  IconPlusMagnifyingGlass,
  IconRectangle,
  IconRectanglePortrait,
  IconRotation,
  IconSquare,
} from "~/components/UI/Icons";
import DropLayout from "~/layouts/DropLayout";
import CropItem from "./CropItem";
import { getCroppedImg } from "~/utils";

function Crop({ sourceImage, isShowToolCroper = true, setCroppedImage }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(1);
  const [isShowGrid, setIsShowGrid] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  
  useDidMountEffect(() => {
    (async () => {
      try {
        const croppedImage = await getCroppedImg(
          sourceImage,
          croppedAreaPixels,
          rotation
        );
        setCroppedImage(croppedImage);
      } catch (e) {
        console.error(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedAreaPixels, rotation]);

  useEffect(() => {
    setIsShowGrid(true);
    const handler = setTimeout(() => {
      setIsShowGrid(false);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [crop]);

  const {
    state: isCropDrop,
    toggle: toggleCropDrop,
    setFalse: closeCropDrop,
  } = useBoolean();
  const {
    state: isZoomDrop,
    toggle: toggleZoomDrop,
    setFalse: closeZoomDrop,
  } = useBoolean();

  const isDrop = isCropDrop || isZoomDrop;

  const handleClickCrop = () => {
    toggleCropDrop();
    closeZoomDrop();
  };

  const handleClickZoom = () => {
    toggleZoomDrop();
    closeCropDrop();
  };

  const handleClickRotation = () => {
    closeZoomDrop();
    closeCropDrop();
    setRotation((rotation) => {
      if (rotation === -270) return 0;
      return rotation - 90;
    });
  };

  const handleActiveCrop = (id) => {
    setCropList(() =>
      cropList.map((crop) => {
        if (crop.id === id) crop.isActive = true;
        else crop.isActive = false;

        return crop;
      })
    );
  };

  const handleCropItem = (id, value) => {
    handleActiveCrop(id);
    setAspect(value);
  };

  const [cropList, setCropList] = useState([
    {
      id: 1,
      title: "Gốc",
      Icon: <IconImage />,
      isActive: false,
      value: 1,
      onClick: handleCropItem,
    },
    {
      id: 2,
      title: "1:1",
      Icon: <IconSquare />,
      isActive: true,
      value: 1,
      onClick: handleCropItem,
    },
    {
      id: 3,
      title: "4:5",
      Icon: <IconRectanglePortrait />,
      isActive: false,
      value: 4 / 5,
      onClick: handleCropItem,
    },
    {
      id: 4,
      title: "16:9",
      Icon: <IconRectangle />,
      isActive: false,
      value: 16 / 9,
      onClick: handleCropItem,
    },
  ]);

  return (
    <>
      <Cropper
        image={sourceImage}
        style={{
          cropAreaStyle: {
            border: "none",
            transition: "all .3s easy-out",
            boxShadow: "0 0 0 9999em #fff",
          },
        }}
        crop={crop}
        rotation={rotation}
        zoom={zoom}
        aspect={aspect}
        showGrid={isShowGrid}
        zoomWithScroll={false}
        // objectFit="horizontal-cover"
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onRotationChange={setRotation}
        onCropComplete={onCropComplete}
      />
      {isShowToolCroper && (
        <div className="absolute left-4 right-4 bottom-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="relative pt-4">
                <button
                  onClick={handleClickCrop}
                  className={`bg-black/70 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/50 ${
                    isDrop && !isCropDrop && "opacity-20"
                  }`}
                >
                  <IconCrop className="text-white w-4 h-4" />
                </button>
                <DropLayout isShow={isCropDrop}>
                  <ul className="bg-black/80 rounded-lg divide-y">
                    {cropList.map((crop) => (
                      <CropItem key={crop.id} item={crop} />
                    ))}
                  </ul>
                </DropLayout>
              </div>
              <div className="relative pt-4">
                <button
                  onClick={handleClickZoom}
                  className={`bg-black/70 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/50 ${
                    isDrop && !isZoomDrop && "opacity-20"
                  }`}
                >
                  <IconPlusMagnifyingGlass className="text-white w-4 h-4" />
                </button>
                <DropLayout isShow={isZoomDrop}>
                  <div className="w-28 h-7 flex items-center bg-black/80 px-3 py-1 rounded-lg">
                    <input
                      id="small-range"
                      type="range"
                      min={0}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(e.target.value)}
                      className="block w-full h-[2px] bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
                    />
                  </div>
                </DropLayout>
              </div>
            </div>
            <div className="relative pt-4">
              <button
                onClick={handleClickRotation}
                className={`bg-black/70 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/50 ${
                  isDrop && "opacity-20"
                }`}
              >
                <IconRotation className="text-white w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Crop;
