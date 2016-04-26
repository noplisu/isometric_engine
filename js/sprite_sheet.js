function SpriteSheet(image, frames) {
	this._image = image;
	this._frames = frames;
}

SpriteSheet.FRAME_X = 0;
SpriteSheet.FRAME_Y = 1;
SpriteSheet.FRAME_WIDTH = 2;
SpriteSheet.FRAME_HEIGHT = 3;
SpriteSheet.FRAME_ANCHOR_X = 4;
SpriteSheet.FRAME_ANCHOR_Y = 5;

_p.drawFrame = function(ctx, index, x, y) {
	var frame = this._frames[index];
	if(!frame)
		return;
	ctx.drawImage(this._image,
		frame[SpriteSheet.FRAME_X], frame[SpriteSheet.FRAME_Y],
		frame[SpriteSheet.FRAME_WIDTH], frame[SpriteSheet.FRAME_HEIGHT],
		x - frame[SpriteSheet.FRAME_ANCHOR_X], y - frame[SpriteSheet.FRAME_ANCHOR_Y],
		frame[SpriteSheet.FRAME_WIDTH], frame[SpriteSheet.FRAME_HEIGHT]
	);
}