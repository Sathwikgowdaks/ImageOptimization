import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Video, { IVideo } from '../../../../models/Video';
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export async function GET(){
    try{
        await connectToDatabase()
        const videos = await  Video.find({}).sort({createdAt:-1}).lean()
        if(!videos || videos.length === 0){
            return NextResponse.json([],{status:200})
        }

        return NextResponse.json(videos);
    }
    catch(error){
        return NextResponse.json(
            {error:"Failed to fetch videos"},
            {status:200}
        );
    }
}

export async function POST(request:NextRequest){
    try{
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json(
                {error:"Unathorized"},
                {status:401}
            )
        }
        await connectToDatabase();

        const body: IVideo = await request.json();
        if(
            !body.title ||
            !body.description ||
            !body.url ||
            !body.thumbnailUrl
        ){
            return NextResponse.json(
                {error:"Missing required fields"},
                {status:400}
            );
        }
        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation:{
                height:1920,
                width: 100,
                quality : body.transformation?.quality ?? 100
        }
    }
    const newVideo = await Video.create(videoData);
    NextResponse.json(newVideo)
}
    catch{
        return NextResponse.json({
            error:"Error in Video Uploading"
        })
    }
}