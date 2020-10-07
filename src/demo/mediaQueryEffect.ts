import { useMediaQuery } from "react-responsive";

const useMediaType = function () {
  let type = "";

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  if (isBigScreen) {
    type = "big-screen";
  } else if (isDesktopOrLaptop) {
    type = "desktop";
  } else if (isTabletOrMobile) {
    type = "tablet";
  } else if (isTabletOrMobileDevice) {
    type = "tablet";
  } else if (isPortrait) {
    type = "potrait";
  } else if (isRetina) {
    type = "retina";
  } else {
    type = "default";
  }

  return type;
}

export default useMediaType;