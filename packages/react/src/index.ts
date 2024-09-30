import ReactVisual from './ReactVisual'
import LazyVideo from './LazyVideo/LazyVideoServer'
import VisualWrapper from './VisualWrapper'
import { collectDataAttributes } from './lib/attributes'

export default ReactVisual
export { LazyVideo, VisualWrapper, collectDataAttributes }
export type {
  ReactVisualProps,
  ObjectFit,
  ObjectFitOption,
  AspectCalculator,
  ImageLoader,
  VideoLoader,
} from './types/reactVisualTypes'
