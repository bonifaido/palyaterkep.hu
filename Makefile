IMAGE ?= palyaterkep:local
PORT ?= 4173

.PHONY: image run

image:
	container build --tag $(IMAGE) --file Containerfile .

run: image
	container run --rm --publish $(PORT):4173 $(IMAGE)