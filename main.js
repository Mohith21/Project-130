music1 = "";
music2 = "";
lWX = 0;
lWY = 0;
rWX = 0;
rWY = 0;
scoreLW = 0;
scoreRW = 0;
music1S = "";
music2S = "";

function preload()
{
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(800, 500);
    canvas.position(400, 200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("POSENET MODEL HAS STARTED");
}

function gotPoses(result)
{
    if(result.length > 0)
    {
        console.log(result);
        scoreLW = result[0].pose.keypoints[9].score;
        scoreRW = result[0].pose.keypoints[10].score;
        lWX = result[0].pose.leftWrist.x;
        lWY = result[0].pose.leftWrist.y;
        rWX = result[0].pose.rightWrist.x;
        rWY = result[0].pose.rightWrist.y;
    }
}

function draw()
{
    image(video, 0, 0, 800, 500);
    fill("#800000");
    stroke("#800000");

    music1S = music1.isPlaying();
    music2S = music2.isPlaying();

    if(scoreRW > 0.2)
    {
        circle(rWX, rWY, 40);
        music2.stop();

        if(music1S == false)
        {
            music1.play();
            document.getElementById("song").innerHTML = "Playing Tarzan";
        }
    }

    if(scoreLW > 0.2)
    {
        circle(lWX, lWY, 40);
        music1.stop();

        if(music2S == false)
        {
            music2.play();
            document.getElementById("song").innerHTML = "Playing Harry Potter Theme Song";
        }
    }
}

function play()
{
    music1.play();
    music1.rate(1);
    music1.setVolume(1);

    music2.play();
    music2.rate(1);
    music2.setVolume(1);

}

function stop()
{
    music1.stop();
    music2.stop();
}