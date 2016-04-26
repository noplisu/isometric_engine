function ImageManager (placeholderDataUri) {
	this._images = {};
	if(placeholderDataUri) {
		this._placeholder = new Image();
		this._placeholder.src = placeholderDataUri;
	}
}

_p = ImageManager.prototype;

_p.get = function(key) {
	return this._images[key];
};

_p.load = function(images, onDone, onProgress) {
	var queue = [];
	for(var im in images) {
		queue.push({ key: im, path: images[im] });
	}
	if(queue.length == 0) {
		onProgress && onProgress(0, 0, null, null, true);
		onDone && onDone();
		return;
	}
	var itemCounter = { loaded: 0, total: queue.length };
	for (var i = 0; i < queue.length; i++) {
		this._loadItem(queue[i], itemCounter, onDone, onProgress);
	}
};

_p._loadItem = function(queueItem, itemCounter, onDone, onProgress) {
	var self = this;
	var img = new Image();
	img.onload = function() {
		self._images[queueItem.key] = img;
		self._onItemLoaded(queueItem, itemCounter, onDone, onProgress, true);
	};
	img.onerror = function() {
		self._images[queueItem.key] = self._placeholder ? self._placeholder : null;
		self._onItemLoaded(queueItem, itemCounter, onDone, onProgress, false);
	};
	img.src = queueItem.path;
};

_p._onItemLoaded = function(queueItem, itemCounter, onDone, onProgress, success) {
	itemCounter.loaded++;
	onProgress && onProgress(itemCounter.loaded, itemCounter.total, queueItem.key, queueItem.path, success);
	if (itemCounter.loaded == itemCounter.total) {
		onDone && onDone();
	}
};