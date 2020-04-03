//new_board.js
Page({
    data: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        boardType: null,
        pageClass: 'container',
        toolsActive: 0,
        isEraser: false,
        chooseColorPopShow: false,
        chooseWidthPopShow: true,
        bgImgSrc: null,
        colorOptions: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF', '#000000', '#7F7F7F', '#FFFFFF'],
        widthOptions: [1, 2, 3, 4, 5],
        lineColor: '#FF0000',
        lineWidth: 2
    },

    onLoad: function (options) {
        var boardType = options.type
        switch (boardType) {
            case 'black':
                this.setData({
                    boardType: boardType,
                    pageClass: this.data.pageClass + ' black-bg'
                })
                break
            case 'grid':
                this.setData({
                    boardType: boardType,
                    pageClass: this.data.pageClass + ' grid-bg'
                })
                break
            case 'img':
                this.setData({
                    pageClass: this.data.pageClass + ' white-bg',
                    bgImgSrc: options.src
                })
                break
            default:
                this.setData({
                    boardType: 'white',
                    pageClass: this.data.pageClass + ' white-bg'
                })
                break
        }
        wx.getSystemInfo({
            success: function (res) {
                var ctx = wx.createCanvasContext('myCanvas')
                ctx.rect(0, 0, res.windowWidth, res.windowHeight - 75)
                if (boardType == 'black') {
                    ctx.setFillStyle('black')
                    ctx.fill()
                    ctx.draw()
                } else if (boardType == 'white' || !boardType) {
                    ctx.setFillStyle('white')
                    ctx.fill()
                    ctx.draw()
                }
            }
        })
    },

    changeToolsActive: function (event) {
        var _this = this
        var toolsIndex = event.currentTarget.dataset.toolsIndex
        if (toolsIndex != _this.data.toolsActive && toolsIndex != '3') {
            switch (toolsIndex) {
                case '1':
                    _this.setData({
                        toolsActive: toolsIndex,
                        isEraser: false,
                        chooseColorPopShow: true,
                        chooseWidthPopShow: false
                    })
                    break
                case '2':
                    _this.setData({
                        toolsActive: toolsIndex,
                        isEraser: false,
                        chooseColorPopShow: false,
                        chooseWidthPopShow: true
                    })
                    break
                case '4':
                    _this.setData({
                        toolsActive: toolsIndex,
                        isEraser: false,
                        chooseColorPopShow: false,
                        chooseWidthPopShow: false
                    }, function () {
                        _this.saveImage()
                    })
                    break
                default:
                    _this.setData({
                        toolsActive: toolsIndex,
                        isEraser: false,
                        chooseColorPopShow: false,
                        chooseWidthPopShow: false
                    })
                    break
            }
        } else if (toolsIndex == '3') {
            _this.setData({
                toolsActive: _this.data.isEraser ? 0 : 3,
                isEraser: !_this.data.isEraser,
                chooseColorPopShow: false,
                chooseWidthPopShow: false
            })
        }
    },

    changeLineColor: function (event) {
        this.setData({
            lineColor: event.currentTarget.dataset.value
        })
    },

    changeLineWidth: function (event) {
        this.setData({
            lineWidth: event.currentTarget.dataset.value
        })
    },
    saveImage: function () {
        wx.canvasToTempFilePath({
            canvasId: 'myCanvas',
            success: function (res) {
                console.log(res)
                wx.navigateTo({
                    url: '../export_img/export_img?src=' + res.tempFilePath
                })
            }
        })
    },
    touchStart: function (event) {
        this.setData({
            startX: event.touches[0].x,
            startY: event.touches[0].y
        })
        this.Draw(this.data.startX, this.data.startY, false);
    },
    touchMove: function (event) {
        this.setData({
            startX: event.touches[0].x,
            startY: event.touches[0].y
        })
        this.Draw(this.data.startX, this.data.startY, true);
    },
    touchEnd: function () { },
    Draw: function (x, y, isDown) {
        const ctx = wx.createCanvasContext('myCanvas')
        // console.log(this.data.endX, this.data.endY, x, y)

        if (isDown) {
            ctx.beginPath();
            if (this.data.isEraser && this.data.boardType == 'white') {
                ctx.setStrokeStyle('#FFFFFF')
                ctx.setLineWidth('10')
            } else if (this.data.isEraser && this.data.boardType == 'black') {
                ctx.setStrokeStyle('#000000')
                ctx.setLineWidth('10')
                ctx.setShadow(0, 0, 0, '#000000')
            } else if (this.data.boardType == 'black') {
                ctx.setStrokeStyle(this.data.lineColor)
                ctx.setLineWidth(this.data.lineWidth)
                ctx.setShadow(0, 0, 10, this.data.lineColor)
            } else {
                ctx.setStrokeStyle(this.data.lineColor)
                ctx.setLineWidth(this.data.lineWidth)
            }

            ctx.setLineJoin("round");
            ctx.setLineCap("round");
            ctx.moveTo(this.data.endX, this.data.endY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
            ctx.draw(true);
        }
        this.setData({
            endX: x,
            endY: y
        })
    }
})