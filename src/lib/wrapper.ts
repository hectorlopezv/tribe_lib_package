/*
 * Tribe Lib Package
 * Copyright 2020
 * Author: Kayman Lab
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 */


import * as bodyPix from '@tensorflow-models/body-pix';


export class VideoTracking {

   /**
    * @desc Class that contain all about how get a MediaStream.
    * 
    * @param {Array} model_architeture_options Differents options of models to use.
    * @param {Array} effect_config_precission Types of segmentation.
    * @param {Array} type_of_device Define the dimensions of the video, in addition to which camera to request in mobile.
    * @param {Object} selection_model_option Save the model selected.
    * @param {Object} selection_effect_option Save the effect selected.
    * @param {Object} selection_type_device Save the type of device selected.
    * @param {Object} canvasElemenet contains a canvas element.
    * @param {Object} VideoElement contains a video element.
    * @param {Object} model contains the model load.
    * @param {Object} Video contains a Promesis of a video tag.
    * @param {String} deviceId contains the id of the video device.
    * @param {Number} frameRate contains frame rate of the segmentation.
    * @param {Object} video_stream contains a MediaStream of video tag.
    * @param {Object} predictionModel Save the prediction.
    *
    */
    

    model_architeture_options: Array<ModelConfig>;
    effect_config_precission: Array<effect_config>;
    type_of_device: Array<typeDeviceConfig>;
    selection_model_option: ModelConfig;
    selection_effect_option: effect_config;
    selection_type_device: typeDeviceConfig;
    canvasElemenet: CanvasElement; 
    VideoElement: HTMLVideoElement;
    model:Promise<unknown>;
    Video: Promise<HTMLVideoElement>;
    deviceId: string;
    frameRate: number;
    video_stream: MediaStream;
    predictionModel: Prediction;

    constructor(model_config_number: number, config_prediction_number:number, type_device_number:number, width:number, height:number, device_id_str?:string  ){
  
        this.model_architeture_options = [{architecture: "MobileNetV1", outputStride: 16, multiplier: 0.5, quantBytes: 2,},//Use in load model
            { architecture: 'MobileNetV1', outputStride: 16, multiplier: 0.75, quantBytes: 2},
            { architecture: 'MobileNetV1', outputStride: 16, multiplier: 0.75, quantBytes: 2}, 
            { architecture: 'MobileNetV1', outputStride: 8, multiplier: 1, quantBytes: 2},
            { architecture: 'ResNet50', outputStride: 16, quantBytes: 2}];

        this.effect_config_precission = [{  flipHorizontal: false, internalResolution: 'low', segmentationThreshold: 0.7},//use in Prediction
            {  flipHorizontal: false, internalResolution: 'medium', segmentationThreshold: 0.7},
            {  flipHorizontal: false, internalResolution: 'high', segmentationThreshold: 0.7},
            {  flipHorizontal: false, internalResolution: 'ultra', segmentationThreshold: 0.7}];

        this.type_of_device = [ { audio: false, video: { facingMode: "user", width: width, height: height }},//use in load_Video
            { audio: false, video: { facingMode: { exact: "environment" }, width: width, height: height }},
            { audio: false, video: {deviceId: device_id_str,  width: width, height: height }},
            { audio: false, video: { width:  width, height: height }}];

        this.selection_model_option =  this.model_architeture_options[model_config_number];
        this.selection_effect_option = this.effect_config_precission[config_prediction_number];
        this.selection_type_device = this.type_of_device[type_device_number];
        this.model = this._load_model(this.selection_model_option);
        this.Video =  this.load_Video_stream(this.selection_type_device);
        this.canvasElemenet = this.createCanvas(width, height);
        this.VideoElement = this.createVideo(width, height);
        this.predictionModel = new Prediction (this.model, this.Video, this.canvasElemenet, this.selection_effect_option, width, height);

    }

    createCanvas(width:number, height:number):CanvasElement {
       /**
        * @desc Create a canva element
        * @param {number} width width of the canva.
        * @param {number} height height of the canva.
        *
        * @return canva element
        */

        const canvas: CanvasElement = <CanvasElement>document.createElement('canvas');
        canvas.setAttribute('width', String(width) );
        canvas.setAttribute('height', String(height) );
        return canvas
      }

    createVideo(width:number, height:number): HTMLVideoElement {
       /**
        * @desc Create a video element
        * @param {number} width width of the video.
        * @param {number} height height of the video.
        *
        * @return video element
        */

        const video: HTMLVideoElement= document.createElement('video');
        video.setAttribute('autoplay','false');
        video.setAttribute('width', String(width) );
        video.setAttribute('height', String(height) );
        video.style.display = 'none';
        return video;
    }

    _load_model(config_model: ModelConfig): Promise<unknown> {
       /**
        * @desc Load the model with the configuration.
        * @param {Object} config_model Configuration of model.
        *
        * @return Model loaded
        */

        return  bodyPix.load(config_model);
    }

    async load_Video_stream(config_constrains:typeDeviceConfig):Promise<HTMLVideoElement>{
       /**
        * @desc Obtain the stream of the video element.
        * @param {Object} config_constrains Configuration of model.
        *
        * @return a promise that load the video stream
        */
     
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia(config_constrains);

        this.VideoElement.srcObject = stream;
        this.video_stream = stream;
        return this.PromiseCreator();
    }

    PromiseCreator (): Promise<HTMLVideoElement>{ /* Return */
    /**
     * @desc Set width and height in the video element
     *
     * @return a promise VideoElement when all data is loaded and ready  with certains dimensions
     */
        return new Promise((resolve) => {
            this.VideoElement.onloadedmetadata = () => {
                this.VideoElement.width = this.VideoElement.videoWidth;
                this.VideoElement.height = this.VideoElement.videoHeight;
            resolve(this.VideoElement);
          };
        });
      }
  
    static addVideo(HTMLelement:HTMLElement, videoElement:CanvasElement|HTMLVideoElement) {
        HTMLelement.appendChild(videoElement);
      }
    
}

export class Prediction {

    /**
    * @desc Class that contain all about how get a prediction.
    * 
    * @param {Promise} loaded_model contains a model loaded.
    * @param {Promise} videoMediaStream contains a MediaStream of video element.
    * @param {Boolean} stop Stop the loop of segmentation.
    * @param {Object} canvasElement constains the canvas element.
    * @param {Object} canvas_stream contains a MediaStream of canvas element.
    * @param {Object} loaded_video Contains the video.
    * @param {Object} height height the video and canva element.
    * @param {Object} width width the video and canva element.
    * @param {String} deviceId Contains the id of the video device.
    * @param {Number} frameRate Contains frame rate of the segmentation.
    * @param {Object} selection_effect_option The option that contains the effect selected.
    * @param {Object} model_prediction Save the prediction.
    */


    loaded_model: Promise<unknown>;
    videoMediaStream: Promise<HTMLVideoElement>;
    stop: boolean;
    canvasElement: CanvasElement;
    canvas_stream: MediaStream;
    loaded_video: HTMLVideoElement|undefined;
    height: number;
    width: number;
    deviceId: string;
    frameRate: number;
    selection_effect_option: effect_config;
    model_prediction: any;

    constructor( loaded_model:Promise<unknown>, videoMediaStream:Promise<HTMLVideoElement>, canvasElemenet:CanvasElement, selection_effect_option:effect_config, width:number, height:number){
         this.loaded_model = loaded_model;
         this.videoMediaStream = videoMediaStream;
         this.stop = false;
         this.canvasElement = canvasElemenet;
         this.selection_effect_option = selection_effect_option;
         this.width = width;
         this.height = height;
     }
     
    static addHTMLCanvas_Video(parentNode:HTMLElement, nodeToAdd:CanvasElement|HTMLVideoElement){
        parentNode.appendChild(nodeToAdd);
    }

    canvas_mediaStream(fps:number):MediaStream{  
        /**
        * @desc Get the MediaStream of the canva
        * @param {Number} fps Frames per second
        *
        * @return the stream of canva
        */

        const ctx:CanvasRenderingContext2D = this.canvasElement.getContext("2d");
        console.log(ctx);
        const stream: MediaStream= this.canvasElement.captureStream(fps);
        return stream;
    }

     async videoImageData (width:number, height:number, videoElement:HTMLVideoElement):Promise<ImageData>{
        /**
        * @desc Get video data
        * @param {Number} width width the video
        * @param {Number} height height the video
        * @param {Object} videoElement the video element
        *
        * @return the data of video
        */
    
        const canvas:CanvasElement = <CanvasElement>document.createElement('canvas');
        canvas.setAttribute('width', String(width) );
        canvas.setAttribute('height', String(height));
        
        const context:CanvasRenderingContext2D = canvas.getContext('2d');
        const img = videoElement;
        
        context.drawImage(img, 0, 0 );
        const theData:ImageData = context.getImageData(0, 0, width, height);
        return theData;
    }

    async getImageData(width:number, height:number, base64:string): Promise<ImageData>{
        /**
        * @desc Get image the video element
        * @param {Number} width width the video
        * @param {Number} height height the video
        * @param {String} base64 --
        *
        * @return the data of image
        */

        const canvas:CanvasElement = <CanvasElement>document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx:CanvasRenderingContext2D = canvas.getContext('2d');

        const img = new Image();
        img.crossOrigin = '';
        img.src = base64;
        
        ctx.drawImage(img, 0, 0, img.width, img.height, 0,0, width, height);
        return ctx.getImageData(0, 0, width, height);   
    }

    stopAnimationLoop():boolean{
        /**
        * @desc Stop the segmentation in the canva
        *
        * @return The option of stop the segmentation.
        */

        this.stop = true;
        return this.stop;
    }

    async make_prediction_load():Promise<void>{ 
        /**
        * @desc Load the model and Get the prediction
        *
        */

        if (typeof this.loaded_video === 'undefined'){
            this.loaded_video = await this.videoMediaStream;
            this.model_prediction = await this.loaded_model;
        }
    }

    async effect_blur_background(canvasElement:CanvasElement, image:HTMLVideoElement, personSegmentation:SemanticPersonSegmentation ,  config:effect_config):Promise<void> {
        /**
        * @desc Get the effect blur
        *
        * @param {Object} canvasElement the canvas element.
        * @param {Object} image image data of video element.
        * @param {Object} personSegmentation model segmentation.
        * @param {Object} config configuration of effect blur.
        *
        * @return The prediction or segmentation of the person
        */

        const {backgroundBlurAmount, edgeBlurAmount, flipHorizontal} = config; 
        await bodyPix.drawBokehEffect(canvasElement, image, personSegmentation, backgroundBlurAmount, edgeBlurAmount, flipHorizontal);
    }

    async virtualBackground_(prediction:SemanticPersonSegmentation, canvasElement: CanvasElement, videoElement:HTMLVideoElement, config:effect_config, base64_img:string){
        /**
        * @desc Config the virtual background
        *
        * @param {Object} prediction Prediction of segmentation.
        * @param {Object} canvasElement Canvas element.
        * @param {Object} videoElement Video element.
        * @param {Object} config Configuration of Virtual Background.
        * @param {String} base64_img Image information.
        *
        */

        const canvas:CanvasElement = canvasElement;
        const newImg:ImageData = canvas.getContext('2d').createImageData(this.width, this.height)
        const newImgData = newImg.data;

        //Prediction
        const {data:map} = prediction;
        const pixelLength:number = map.length;
        
        //Video Data
        const { data: videoData } = await this.videoImageData(this.width, this.height, videoElement);
    
        //ImageData
        const {data: imgData} = await this.getImageData(this.width, this.height, base64_img);

        for (let i = 0; i < pixelLength; i++) {

            const [r, g, b, a] = [imgData[i*4], imgData[i*4 + 1], imgData[i*4 + 2], imgData[i*4 + 3]];
            [
                newImgData[i*4], 
                newImgData[i*4 +1],
                newImgData[i*4 + 2], 
                newImgData[i*4 + 3]
            ] = !map[i]   ? [r, g, b, a] : [
                                            videoData[i*4], 
                                            videoData[i*4 +1], 
                                            videoData[i*4 + 2], 
                                            0]
        }
        this.canvasElement.getContext('2d').clearRect(0,0,this.width, this.height);
        const {  backgroundBlurAmount, edgeBlurAmount, flipHorizontal } = config;
        bodyPix.drawMask(canvas, videoElement, newImg, backgroundBlurAmount, edgeBlurAmount, flipHorizontal);    
    }
    
    async virtual_background(canvasElement: CanvasElement, videoElement:HTMLVideoElement, personSegmentation:SemanticPersonSegmentation,  config:effect_config, base64_img:string){
        /**
        * @desc Get the virtual background
        *
        * @param {Object} canvasElement Canvas element.
        * @param {Object} videoElement Video element.
        * @param {Object} personSegmentation Segmentation of model.
        * @param {Object} config Configuration of Virtual Background.
        * @param {String} base64_img Image information.
        *
        */
        await this.virtualBackground_(personSegmentation, canvasElement, videoElement, config, base64_img);
    }
 
    async blurBodyPart_(canvasElement: CanvasElement, videoElement:HTMLVideoElement, personSegmentationParts:SemanticPartSegmentation,  config:effect_config) {
        /**
        * @desc Get the Blur body parts effect
        *
        * @param {Object} canvasElement Canvas element.
        * @param {Object} videoElement Video element.
        * @param {Object} personSegmentation Segmentation of model.
        * @param {Object} config Configuration of Virtual Background.
        *
        */
        
        /*Reference of Body Parts*/
        const {backgroundBlurAmount, edgeBlurAmount, flipHorizontal, faceBodyPartIdsToBlur} = config;
        await bodyPix.blurBodyPart(canvasElement, videoElement, personSegmentationParts, faceBodyPartIdsToBlur,
            backgroundBlurAmount, edgeBlurAmount, flipHorizontal);
    }

    async grayScale(canvasElement: CanvasElement, videoElement:HTMLVideoElement, personSegmentation:SemanticPersonSegmentation){
        /**
        * @desc Get gray scale effect
        *
        * @param {Object} canvasElement Canvas element.
        * @param {Object} videoElement Video element.
        * @param {Object} personSegmentation Segmentation of model.
        *
        */

        const {data:map} = personSegmentation;
        // Extracting video data
        const { data:imgData } = await this.videoImageData(this.width, this.height, videoElement);

        //New canvas
        const canvas:CanvasElement = canvasElement;

        /*Clean Canvas*/
        const newImg:ImageData = canvas.getContext('2d').createImageData(canvas.width, canvas.height);
        const newImgData = newImg.data;

        //[r0, g0, b0, a0, r1, g1, b1, a1, ..., rn, gn, bn, an]
        for (let i = 0; i < map.length; i++) {

            const [r, g, b, a]: number[] = [imgData[i*4], imgData[i*4+1], imgData[i*4+2], imgData[i*4+3]];
            // GrayScale Effect
            const gray = ((0.3 * r) + (0.59 * g) + (0.11 * b));
            [
                newImgData[i*4],
                newImgData[i*4+1],
                newImgData[i*4+2],
                newImgData[i*4+3]
            ] = !map[i] ? [gray, gray, gray, 255] : [r, g, b, a];
        }
        canvas.getContext('2d').putImageData(newImg, 0, 0);/*Paint the canvas*/
    }

    async loop_(type_prediciton:number, config_:effect_config){
        /**
        * @desc Get the virtual background
        *
        * @param {Number} type_prediciton Type of prediction and segmentation.
        * @param {Object} config_ Conguration of effect.
        *
        */

        await this.make_prediction_load();
        const loaded_video:HTMLVideoElement = this.loaded_video;
        const model_prediction = this.model_prediction;
        const config = {...config_, ...this.selection_effect_option};
        const {base64_img } = config;
    
        const loopping = async () =>{/*Loop for animation*/
            if(this.stop){
                /*if the is  a loop running stop it*/
                this.stop = false;/*making the object reusable*/
                return;
            }

            if (type_prediciton === 1){/*Blur Background - - PersonSegmentation*/
               
                const prediction_frame = await model_prediction.segmentPerson(loaded_video, config);
                this.effect_blur_background(this.canvasElement, this.loaded_video, prediction_frame,  config);
            }
            
            else if (type_prediciton === 2){//Virtual Background - PersonSegmentation
                
                const prediction_frame:SemanticPersonSegmentation = await model_prediction.segmentPerson(loaded_video, config);     
                this.virtual_background(this.canvasElement, this.loaded_video, prediction_frame,  config, base64_img);
            }
            else if(type_prediciton === 3){//Gray SCale - PersonSegmentation
                
                const prediction_frame:SemanticPersonSegmentation = await model_prediction.segmentPerson(loaded_video, config);     
                this.grayScale(this.canvasElement, this.loaded_video, prediction_frame);
            }
            
            else if(type_prediciton === 4){//Blur Body PARTS - PersonSegmentationPARTS
                const prediction_frameParts:SemanticPartSegmentation = await model_prediction.segmentPersonParts(loaded_video, config); 
                this.blurBodyPart_(this.canvasElement, this.loaded_video, prediction_frameParts, config);
            }
            
            window.requestAnimationFrame(loopping);/*Recursive call*/
       }
    loopping();/*Closure*/
    } 
 }
