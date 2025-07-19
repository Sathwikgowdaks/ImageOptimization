 import mongoose,{Schema,model} from "mongoose";

export const Video_Dimensions = {
    width: 1080,
    height: 1920
}
export interface IVideo{
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
    controls?: boolean;
    transformation?: {
        width?: number;
        height?: number;
        quality?: number;
    }
}
const videoSchema = new Schema<IVideo>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
});

const Video = model<IVideo>('Video', videoSchema);

