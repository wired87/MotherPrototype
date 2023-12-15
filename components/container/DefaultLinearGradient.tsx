
import Chroma from "chroma-js";
import {LinearGradient} from "expo-linear-gradient";
import {memo} from "react";

const INTERVAL = 2;

// @ts-ignore
const DefaultLinearGradient = ({ children, linearViewStyles, customTopColor, customBottonColor }) => {

  const TOP_COLORS = customTopColor ? customTopColor :  ['#9c0582', '#0e198c', '#1d155e', '#2A3BEF', '#662250', '#6b0e5e'];
  const BOTTOM_COLORS = customBottonColor ? customBottonColor :  ['#0e198c', '#1d155e', '#4f0c3d', '#7F00FF', '#0e198c'];

  return(
    <LinearGradient style={linearViewStyles} colors={[TOP_COLORS , BOTTOM_COLORS]} >
      {children}
    </LinearGradient>
  );
}
export default memo(DefaultLinearGradient);

/*  const GRADIENT_COLOR_LENGTH = 700;

  const TOP_COLORS_SPECTRUM = Chroma.scale(TOP_COLORS).colors(GRADIENT_COLOR_LENGTH);
  const BOTTOM_COLORS_SPECTRUM = Chroma.scale(BOTTOM_COLORS).colors(GRADIENT_COLOR_LENGTH);
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [colorTop, setColorTop] = useState(TOP_COLORS_SPECTRUM);
  const [colorBottom, setColorBottom] = useState(BOTTOM_COLORS_SPECTRUM);
  useEffect(() => {
    const interval = setInterval(() => {
      let newTopIndex = topIndex + 1;
      if (newTopIndex === TOP_COLORS_SPECTRUM.length) {
        newTopIndex = 0;
      }
      let newBottomIndex = bottomIndex + 1;
      if (newBottomIndex === BOTTOM_COLORS_SPECTRUM.length) {
        newBottomIndex = 0;
      }
      setTopIndex(newTopIndex);
      setBottomIndex(newBottomIndex);
      setColorTop(TOP_COLORS_SPECTRUM[newTopIndex]);
      setColorBottom(BOTTOM_COLORS_SPECTRUM[newBottomIndex]);
    }, INTERVAL);

    return () => clearInterval(interval); // Clear the interval on component unmount

  }, [topIndex, bottomIndex]);
 */