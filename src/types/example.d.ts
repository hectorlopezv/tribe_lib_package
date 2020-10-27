/**
 * If you import a dependency which does not include its own type definitions,
 * TypeScript will try to find a definition for it by following the `typeRoots`
 * compiler option in tsconfig.json. For this project, we've configured it to
 * fall back to this folder if nothing is found in node_modules/@types.
 *
 * Often, you can install the DefinitelyTyped
 * (https://github.com/DefinitelyTyped/DefinitelyTyped) type definition for the
 * dependency in question. However, if no one has yet contributed definitions
 * for the package, you may want to declare your own. (If you're using the
 * `noImplicitAny` compiler options, you'll be required to declare it.)
 *
 * This is an example type definition which allows import from `module-name`,
 * e.g.:
 * ```ts
 * import something from 'module-name';
 * something();
 * ```
 */
declare module 'module-name' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whatever: any;
  export = whatever;
}


type BodyPixInternalResolution = number|'low'|'medium'|'high'|'full';
type BodyPixOutputStride = 32|16|8;
type BodyPixArchitecture = 'ResNet50'|'MobileNetV1';
type BodyPixQuantBytes = 1|2|4;
type BodyPixMultiplier = 1.0|0.75|0.50;
interface ModelConfig  {
  architecture: BodyPixArchitecture;
  outputStride: BodyPixOutputStride;
  multiplier?: BodyPixMultiplier;
  modelUrl?: string;
  quantBytes?: BodyPixQuantBytes;
}


interface Vector2D  {
  y: number,
  x: number
}
interface Pose  {
  keypoints: Keypoint[],
  score: number,
}
interface CanvasElement extends HTMLCanvasElement { 
  captureStream(frameRate?: number): MediaStream;          
 }
interface Keypoint {
  score: number,
  position: Vector2D,
  part: string
}
interface partsbody {
  'left_face':number;
  'torso_front': number; 
  'right_face':number;
  'torso_back':number;
  'left_upper_arm_front':number; 
  'left_upper_leg_front':number; 
  'left_upper_arm_back':number;            
  'left_upper_leg_back':number;
  'right_upper_arm_front': number; 
  'right_upper_leg_front':number;                   
  'right_upper_arm_back':number; 
  'right_upper_leg_back':number; 
  'left_lower_arm_front':number;                 
  'left_lower_leg_front':number; 
  'left_lower_arm_back':number; 
  'left_lower_leg_back':number;               
  'right_lower_arm_front':number; 
  'right_lower_leg_front':number; 
  'right_lower_arm_back':number;                     
  'right_lower_leg_back':number;
  'left_hand': number;
  'left_foot': number; 
  'right_hand':number;             
  'right_foot': number;
}
interface SemanticPartSegmentation {
  data: Int32Array;
  width: number;
  height: number;
  allPoses: Pose[];
}

interface SemanticPersonSegmentation  {
  data: Uint8Array;
  width: number;
  height: number;
  allPoses: Pose[];
}

interface PartSegmentation  {
  data: Int32Array;
  width: number;
  height: number;
  pose: Pose;
}

interface PersonSegmentation  {
  data: Uint8Array;
  width: number;
  height: number;
  pose: Pose;
}

interface typeDeviceConfig_video {
  width: number;
  height: number;
  deviceId?: string;
  facingMode?: unknown;
}

interface typeDeviceConfig {
  audio: boolean;
  video: typeDeviceConfig_video 
}

interface testing {
  x: number; 

}

interface effect_config {
  backgroundBlurAmount?: number;
  edgeBlurAmount?: number;
  base64_img?: string;
  faceBodyPartIdsToBlur?: number[];
  flipHorizontal?: boolean;
  internalResolution?: string;
  segmentationThreshold?: number;
}

