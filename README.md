
# Virtual Background Bodypix :computer:

  

## Description :page_facing_up:
Using getusermedia as a video input, we offer the effects blur background, blur bodyParts, virtualBackground, grayScale having bodPix as a backbone!
Use bodypix in 3 lines!, making easy for non developers and developers to use bodypix with multiple effects.

## Install

Can install it via npm for use in a TypeScript / ES6 project.
```sh
$ npm i tribe_lib
```
### How To Use
After installing we simply use our three magic lines, to get a MediaStream Object that you can use for wherever you want.
```js
//Common Javascript
const virtualBackgroundBodypixLite = require("tribe_lib");

//ES6
import {VideoTracking, Prediction} from 'tribe_lib';

//How to Use
const Tracking = new VideoTracking(type_model_architecture, effect_config_type, type_of_device);
Tracking.predictionModel.loop_(type_prediciton, configEffect);
const MediaStream = Tracking.predictionModel.canvas_mediaStream();
```
### Models
   We can define 5 categories ***Ultra low***,  ***Low***, ***Medium***, ***High***, ***Ultra*** for model configuration
   
| Categories | Description | Option 
|--|--|--|
| Ultra low | Recommended for low-end mobile devices| 0
| Low |  Recommended for mid-end mobile devices| 1
| Medium | Recommended for computers with at least one intel pentium processor |2
| High | Recommended for computers with at least one intel core i3 processor |3
| Ultra| Recommended for computers with at least one intel core i5 processor |4
```js
  const model_config_ultra_low = {architecture: "MobileNetV1", outputStride: 16, multiplier: 0.5, quantBytes: 2,};
  const model_config_low = { architecture: 'MobileNetV1', outputStride: 16, multiplier: 0.75, quantBytes: 2}; 
  const model_config_medium = { architecture: 'MobileNetV1', outputStride: 16, multiplier: 0.75, quantBytes: 2};
  const model_config_high = { architecture: 'MobileNetV1', outputStride: 8, multiplier: 1, quantBytes: 2};
  const model_config_ultra = { architecture: 'ResNet50', outputStride: 16, quantBytes: 2};
```
### Level Of Prediction

We can define the level of prediction
|Categories  | Resolution |Option
|--|--|--|
| Low |  Minimum|0
| Medium|  Average|1
| High|  High|2
```js
  const effect_config_precission_low = { flipHorizontal: false, internalResolution: 'low', segmentationThreshold: 0.7};
  const effect_config_precission_mid = { flipHorizontal: false, internalResolution: 'medium', segmentationThreshold: 0.7}; 
  const effect_config_precission_high = { flipHorizontal: false, internalResolution: 'high', segmentationThreshold: 0.7};
  const effect_config_precission_ultra = { flipHorizontal: false, internalResolution: 'ultra', segmentationThreshold: 0.7};
```
### Type Of Devices
We can define the dimensions of the video, in addition to which camera to request in mobile.
```js
 const mobile_front_camera = { audio: false, video: { facingMode: "user", width: width, height: height }};
 const mobile_rear_camera = { audio: false, video: { facingMode: { exact: "environment" }, width: width, height: height }};
 const desktop_selected_camera_device = { audio: false, video: {deviceId: "0faf4c1dc3b35ff09df6a31..." , width: width, height: height }};
 const desktop_select_camera_default = { audio: false, video: { width: width, height: height }};
```   

### Config Effects
These are the effects, the magic of this library, you can define what effect use:
#### Grey scale
![Image](https://i.imgur.com/d8Xs7i0.png[/img])

![Image](https://i.imgur.com/OgyT3Sl.png[/img])
```js
 Tracking.predictionModel.loop_(3);
 const MediaStream = Tracking.predictionModel.canvas_mediStream();
```
#### Blur
![Image](https://i.imgur.com/xkAT4pf.png[/img])
```js
 Tracking.predictionModel.loop_(1, config_effect_bokek);
 const MediaStream = Tracking.predictionModel.canvas_mediaStream();
```
#### Virtual Background
![Image](https://i.imgur.com/m42kzl8.png[/img])
```js
 Tracking.predictionModel.loop_(2, config_virtual_background);
 const MediaStream = Tracking.predictionModel.canvas_mediaStream();
```
#### Blur Body Parts
![Image](https://i.imgur.com/SKfLbIB.png[/img])
```js
const parts:partsbody = 
{
  'left_face':0, 'torso_front': 12, 
  'right_face':1, 'torso_back':13,
  'left_upper_arm_front':2, 'left_upper_leg_front':14,
   'left_upper_arm_back':3, 'left_upper_leg_back':15, 
   'right_upper_arm_front': 4, 'right_upper_leg_front':16,
  'right_upper_arm_back':5, 'right_upper_leg_back':17, 
  'left_lower_arm_front':8, 'left_lower_leg_front':18, 
  'left_lower_arm_back':7, 'left_lower_leg_back':19,
  'right_lower_arm_front':8, 'right_lower_leg_front':20, 
  'right_lower_arm_back':9, 'right_lower_leg_back':21, 
  'left_hand':10, 'left_foot': 22, 'right_hand':11,
  'right_foot': 23
 }
 Tracking.predictionModel.loop_(4, config_blur_body_part);
 const MediaStream = Tracking.predictionModel.canvas_mediaStream();
```
```js
   const config_effect_bokek = {backgroundBlurAmount: 20, edgeBlurAmount: 10};
   const config_virtual_background = {backgroundBlurAmount: 1, edgeBlurAmount: 2.1, URL: 'base64'};
   const config_greyScale = {};
   const config_blur_body_part = { backgroundBlurAmount: 30, edgeBlurAmount: 2.1, faceBodyPartIdsToBlur: [0, 1] };
```
    

## Authors :black_nib:

**Hector Lopez** [Github](https://github.com/hectorlopezv)

**Hugo Fernel** [Github](https://github.com/daviddlhz)

**Jhonathan Angarita** [Github](https://github.com/JhonathanAlejandro01)

**David De La Hoz** [Github](https://github.com/daviddlhz)
