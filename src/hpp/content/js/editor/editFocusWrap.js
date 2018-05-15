(function(root, factory) {
    root.editFocusWrap = factory(root)
})(this, function(root) {
    function Corner() {

        this.init();
    }

    Corner.prototype = {
        constructor: Corner,


        init: function(width, height) {
            this.width = width || 0;
            this.height = height || 0;

            // this.corners = 
        },
        changeAllModel: function(model) {
            var corners = this.corners
            for (var key in corners) {
                corners[key].model = model
            }
        }
    };

    var corners = new Corner();

    function MoveType() {

    }

    MoveType.prototype = {
        init: function(evt) {
            console.log(evt)
            this.target = evt.target;
            this.width = this.target.offsetWidth;
            this.height = this.target.offsetHeight;
            this.clientX = evt.targetTouches[0].clientX
            this.clientY = evt.targetTouches[0].clientY
            this.result()
        },

        result: function() {
            var w = this.width,
                h = this.height,
                x = this.clientX,
                y = this.clientY;
            console.log(x)
            if (x < 50 && y < 50) {
                this.type = 'corner1'
            }
        }

    };

    var moveType = new MoveType()
    var TOOLSBARS = {
        'unlock':[
            {
                type:'unlock',
                name:'解锁'
            }
        ],
        'text': [
            {
                type: 'delete',
                name: '删除',
            },
            {
                type: 'set-style',
                name: '应用'
            },
            {
                type: 'copy',
                name: '复制'
            },
            {
                type: 'paste',
                name: '粘贴',
            },
            {
                type: 'lock',
                name: '锁定'
            }
        ],
        'text-fixed': [
            {
                type: 'delete',
                name: '删除',
            },
            {
                type: 'set-style',
                name: '应用'
            },
            {
                type: 'copy',
                name: '复制'
            },
            {
                type: 'paste',
                name: '粘贴',
            },
            {
                type: 'lock',
                name: '锁定'
            }
        ],
        'img': [{
                type: 'delete',
                name: '删除'
            },
            {
                type: 'photo',
                name: '照片',
            },
            {
                type: 'video',
                name: '视频',
            },
            {
                type: 'set-color',
                name: '填色',
            }
        ],
        'img-fixed': [
          
            {
                type: 'photo',
                name: '照片',
            },
            {
                type: 'video',
                name: '视频',
            },
            {
                type: 'set-color',
                name: '填色',
            },
            {
                type: 'delete',
                name: '删除'
            }
        ],
        'img-align': [
            {
                type: 'align-center',
                name:'居中'
            },
            {
                type: 'align-left',
                name:'居左'
            },
            {
                type: 'align-right',
                name:'居右'
            },
            {
                type: 'copy',
                name: '复制'
            },
            {
                type: 'paste',
                name: '粘贴',
            },
            {
                type: 'lock',
                name:'锁定'
            }
        ],
        'img-align-fixed': [
            {
                type: 'lock',
                name:'锁定'
            }
        ],
         'video': [{
                type: 'delete',
                name: '删除'
            },
            {
                type: 'photo',
                name: '照片',
            },
            {
                type: 'video',
                name: '视频',
            },
            {
                type: 'set-color',
                name: '填色',
            }
        ],
        'video-fixed': [
            {
                type: 'delete',
                name: '删除'
            },
            {
                type: 'photo',
                name: '照片',
            },
            {
                type: 'video',
                name: '视频',
            },
            {
                type: 'set-color',
                name: '填色',
            },
        ],
        'video-align': [
            {
                type: 'align-center',
                name:'居中'
            },
            {
                type: 'align-left',
                name:'居左'
            },
            {
                type: 'align-right',
                name:'居右'
            },
            {
                type: 'lock',
                name:'锁定'
            }
        ],
        'video-align-fixed': [
            {
                type: 'lock',
                name:'锁定'
            }
        ]
        // 'module':['delete']
    }

    var editFocusWrap = {
        template: '<div class="m-edit-focus-wrap" \
							 :style="{\
							 	left: left + \'px\',\
							 	top: focusWrapTop + \'px\',\
							 	\
							 }">\
							 <div class="mask"\
							 	v-show="showMoveTools"\
							 	:style="{\
							 		height: height + \'px\',\
							 		width: width + \'px\',\
							 	}"\
							 ></div>\
							<div class="move-tools flex"\
								 v-if="false"\
								 :style="{\
	 									top: height / 2 - 13 + \'px\',\
	 									left: width / 2 - 13 + \'px\',\
	 								}">\
								<div class="move" \
								v-finger:press-move="pressMove.bind(this,\'move\')">\
									<i class="iconfont icon-move"></i>\
								</div>\
								<div class="rotate"\
									v-finger:press-move="pressMove.bind(this,\'rotate\')">\
									<i class="iconfont icon-rotate"></i>\
								</div>\
								\
							</div>\
							<div class="edit-tools"\
								 :style="{\
	 									top: editToolsSize.height + \'px\',\
	 									left: editToolsSize.width + \'px\',\
	 								}"\
								 v-if="showEditTools">\
								<div v-for="item in toolsBar"\
									 class="edit-item"\
									 v-finger:tap="singleTap.bind(this, item.type)">\
									 <span>{{item.name}}</span>\
								</div>\
							</div>\
							<div class="corners" v-show="!locked" \
								:style="{\
									transformOrigin: width/2+\'px \'+  height/2 + \'px\',\
									transform: \'rotate(\'+focusWrapEditor.rotate+\'deg)\'\
								}"\
								>\
								<span class="corner"\
									  v-for="(corner, index) in corners"\
									  v-show="!corner.radiu || (focusWrapData.model == 1  && focusWrapEditor.borderRadiusWidth > 0 && !focusWrapEditor.fixed)"\
									  :data-type="corner.dir"\
									  :data-key="index"\
									  :class="[corner.name, corner.model==1?\'model1\':\'model2\',corner.model==1&&focusWrapEditor.type==\'text\'?\'hide-after\':\'\']"\
									  :style="{\
										left:corner.left + \'px\',\
										top:corner.top + \'px\'\
									  }"\
								></span>\
							</div>\
							<div class="rotates" v-show="showRotate"\
                                :style="{\
                                    transformOrigin: width/2+\'px \'+  height/2 + \'px\',\
                                    transform: \'rotate(\'+focusWrapEditor.rotate+\'deg)\'\
                                }"\
                                >\
								<span class="rotate"\
									  :class="[rotate.name]"\
									   v-for="rotate in rotateCorners"\
									   :style="{\
											left:rotate.left + \'px\',\
											top:rotate.top + \'px\'\
									   }">\
								</span>\
							</div>\
						</div>',
        // <span class="corner corner3"\
        // 									  :class="[cornerColorClass]"\
        // 									  :style="{\
        // 									  	left: \'-3px\',\
        // 									  	top: height -3 + \'px\',\
        // 									  }"\
        // 									  v-finger:press-move="pressMove.bind(this,\'corner3\')"></span>\
        props: {
            options: {
                type: Object,
                default: null
            },

            focusWrapData: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            focusWrapEditor: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            focusWrapTop: {
                type: Number,
                default: 0
            },
            blockModel: {
                type: Boolean,
                default: false
            }

        },
        data() {
            return {
                longtouchTimeout: null,
                moveType: '',
                rotateDeg:0
            }
        },
        computed: {
            rotateCorners: function() {
                return [{
                        name: 'rotate_1',
                        left: -20,
                        top: -20
                    },
                    {
                        name: 'rotate_2',
                        left: this.width,
                        top: -20
                    },
                    {
                        name: 'rotate_3',
                        left: -20,
                        top: this.height
                    },
                    {
                        name: 'rotate_4',
                        left: this.width,
                        top: this.height
                    }
                ]
            },
            corners: function() {

                var obj = {

                    cornerTop: {
                        name: 'corner-top',
                        left: this.width / 2 - 3,
                        top: -3,
                        model: this.focusWrapData.model,
                        dir: 'top'
                    },

                    cornerLeft: {
                        name: 'corner-left',
                        left: -3,
                        top: this.height / 2 - 3,
                        model: this.focusWrapData.model,
                        dir: 'left'
                    },

                    cornerRight: {
                        name: 'corner-right',
                        left: this.width - 3,
                        top: this.height / 2 - 3,
                        model: this.focusWrapData.model,
                        dir: 'right'
                    },

                    cornerBottom: {
                        name: 'corner-bottom',
                        left: this.width / 2 - 3,
                        top: this.height - 3,
                        model: this.focusWrapData.model,
                        dir: 'bottom'
                    }
                }
                // if(this.focusWrapEditor.borderTopLeftRadius_w){
                // 	delete obj.corner1,
                obj.corner1_1 = {
                    name: 'corner1_1',
                    left: (-3 + (this.focusWrapEditor.borderTopLeftRadius_w || 0)),
                    top: -3,
                    model: this.focusWrapData.model,
                    dir: 'corner1'
                }

                obj.corner1_2 = {
                    name: 'corner1_2',
                    left: -3,
                    top: -3 + (this.focusWrapEditor.borderTopLeftRadius_h || 0),
                    model: this.focusWrapData.model,
                    dir: 'corner1'
                }

                obj.corner1_3 = {
                    name: 'corner1_radiu',
                    radiu: true,
                    left: (obj.corner1_1.left + obj.corner1_2.left) / 2,
                    top: (obj.corner1_1.top + obj.corner1_2.top) / 2,
                    model: this.focusWrapData.model,
                    dir: 'corner1'
                }


                // }

                // if((this.focusWrapEditor.borderTopRightRadius_w) || 0){
                // 	delete obj.corner2,
                obj.corner2_1 = {
                    name: 'corner2_1',
                    left: this.width - 3 - (this.focusWrapEditor.borderTopRightRadius_w || 0),
                    top: -3,
                    model: this.focusWrapData.model,
                    dir: 'corner2'
                }

                obj.corner2_2 = {
                    name: 'corner2_2',
                    left: this.width - 3,
                    top: -3 + (this.focusWrapEditor.borderTopRightRadius_h || 0),
                    model: this.focusWrapData.model,
                    dir: 'corner2'
                }

                obj.corner2_3 = {
                    name: 'corner2_radiu',
                    radiu: true,
                    left: (obj.corner2_1.left + obj.corner2_2.left) / 2,
                    top: (obj.corner2_1.top + obj.corner2_2.top) / 2,
                    model: this.focusWrapData.model,
                    dir: 'corner2'
                }
                // }

                // if((this.focusWrapEditor.borderBottomLeftRadius_w) || 0){
                // 	delete obj.corner3,
                obj.corner3_1 = {
                    name: 'corner3_1',
                    left: -3 + (this.focusWrapEditor.borderBottomLeftRadius_w || 0),
                    top: this.height - 3,
                    model: this.focusWrapData.model,
                    dir: 'corner3'
                }

                obj.corner3_2 = {
                    name: 'corner3_2',
                    left: -3,
                    top: this.height - 3 - (this.focusWrapEditor.borderBottomLeftRadius_h || 0),
                    model: this.focusWrapData.model,
                    dir: 'corner3'
                }
                obj.corner3_3 = {
                    name: 'corner3_radiu',
                    radiu: true,
                    left: (obj.corner3_1.left + obj.corner3_2.left) / 2,
                    top: (obj.corner3_1.top + obj.corner3_2.top) / 2,
                    model: this.focusWrapData.model,
                    dir: 'corner3'
                }
                // }

                // if((this.focusWrapEditor.borderBottomRightRadius_w) || 0){
                // 	delete obj.corner4,
                obj.corner4_1 = {
                    name: 'corner4-1',
                    left: this.width - 3 - (this.focusWrapEditor.borderBottomRightRadius_w || 0),
                    top: this.height - 3,
                    model: this.focusWrapData.model,
                    dir: 'corner4'
                }

                obj.corner4_2 = {
                    name: 'corner4-2',
                    left: this.width - 3,
                    top: this.height - 3 - (this.focusWrapEditor.borderBottomRightRadius_h || 0),
                    model: this.focusWrapData.model,
                    dir: 'corner4'
                }
                obj.corner4_3 = {
                    name: 'corner4_radiu',
                    radiu: true,
                    left: (obj.corner4_1.left + obj.corner4_2.left) / 2,
                    top: (obj.corner4_1.top + obj.corner4_2.top) / 2,
                    model: this.focusWrapData.model,
                    dir: 'corner4'
                }
                // }

                return obj
            },
            model: function() {
                return this.focusWrapData.model
            },
            showMoveTools: function() {
                var obj = this.focusWrapData
                // return obj.showTools && obj.model === 2 &&  !this.focusWrapEditor.fixed;
                return obj.model === 2;
            },
            showEditTools: function() {
                // console.log(this.focusWrapData.showTools)
                return this.focusWrapData.showTools;
            },
            showRotate: function () {
            	return 	this.focusWrapData.showRotate && this.focusWrapData.model === 2
            },
            // showCornerRadiu: function () {
            // 	return !corner.radiu || (focusWrapData.model == 1  && focusWrapEditor.borderRadiusWidth > 0
            // },
            width: function() {
                if (this.focusWrapEditor && this.focusWrapEditor.type !== 'module') {
                    return this.focusWrapEditor.width
                } else {
                    return window.innerWidth
                }

            },

            left: function() {
                return this.focusWrapEditor ? this.focusWrapEditor.left : 0
            },

            height: function() {
                return this.focusWrapEditor ? this.focusWrapEditor.height : 0
            },
            cornerColorClass() {
                // console.log(this.focusWrapData.model)
                // return 'model' + this.options.model
                return 'model' + this.focusWrapData.model
            },
            locked: function() {
                // console.log('this.focusWrapEditor.locked')
                // console.log(this.focusWrapEditor.locked)
                return this.focusWrapEditor.locked
            },
            toolsBar: function() {
                var obj = this.focusWrapData
                var arr = []
                var type = this.focusWrapEditor.fixed ? this.editorType + '-fixed' : this.editorType
                console.log(this.focusWrapEditor)

                if(this.editorType === 'text'){
                    if(obj.model === 2){
                        arr = TOOLSBARS[type]
                    }
                }

                if(this.editorType === 'img'|| this.editorType === 'video'){
                    if(obj.model === 1){
                         arr = TOOLSBARS[type]
                     }else if(obj.model === 2 ){
                        arr = this.focusWrapEditor.fixed ? TOOLSBARS['img-align-fixed'] : TOOLSBARS['img-align']
                     }
                }

                if(this.focusWrapEditor.locked){
                    arr=TOOLSBARS['unlock']
                }

                // if (obj.model === 2 || this.editorType === 'img') {
                    
                // } else {
                //     arr = []
                // }
                console.log(arr)
                return arr
            },
            editorType: function() {
                return this.focusWrapEditor.type
            },
            editToolsTop: function() {
                // console.log(11111111111111111111111111111)
                // console.log(this.focusWrapTop)
                return this.focusWrapTop > 30 ? this.height / 2 - 50 : this.height / 2 + 40
            },
            editToolsSize: function () {
                // console.log(document.getElementsByClassName('edit-tools'))
                // var editTools = document.getElementsByClassName('edit-tools')[0]

                // if(editTools){
                //     console.log(editTools.offsetWidth)
                // }
                var t_width = (this.toolsBar.length) * 55
                console.log(t_width)
                var left = this.width / 2  - t_width/2
                    // width = width + this.left < 0 ?
                    if(left + this.left < 0){
                        left = -left - this.left + left
                    }

                    if(left + this.left + t_width > window.innerWidth){
                        left = window.innerWidth - this.left - t_width
                    }
                return {
                    width:left,
                    height:this.height / 2 - 13
                }
            }

        },
        methods: {
            hideMoveTools: function() {
                this.focusWrapData.showTools = false;
            },
            clickMask: function(evt) {

            },
            pressMoveCorner(evt) {
                // console.log(this.focusWrapEditor.fixed)
                if (this.focusWrapEditor.fixed || this.focusWrapEditor.locked) return
                // console.log(evt.target.nodeName)
                if (evt.target.nodeName !== 'SPAN') return
                evt.stopPropagation();
                evt.preventDefault()
                if (this.model === 2) {
                    this.$emit('move', evt, evt.target.dataset.type)
                }
                if (this.editorType !== 'text' && this.model === 1) {
                    this.$emit('edit', 'setBorderRadius', evt)
                }

            },
            pressMove: function(type, evt) {
                 if (this.focusWrapEditor.fixed || this.focusWrapEditor.locked) return
                evt.preventDefault()
                evt.stopPropagation();
               

                if (this.model === 2) {
                    this.$emit('move', evt, type)
                }
            },
            pressMoveRotate: function (evt) {
            	// 锁定的模块不能编辑
            	if (this.focusWrapEditor.fixed || this.focusWrapEditor.locked)  return
            	evt.stopPropagation();
                evt.preventDefault()

                this.$emit('rotate', evt, 'rotate')

            },
            saveRotateDeg: function(evt) {
                if (this.focusWrapEditor.fixed || this.focusWrapEditor.locked) return

                this.$emit('rotate', evt, 'start')
                // 记录旋转的角度
                // 
                // console.log(this.focusWrapEditor)
                // this.rotateDeg = this.focusWrapEditor.rotate
            },
            singleTap(type) {
                this.$emit('edit', type)
            },

            setBorderRadius(corner) {
                // console.log(corner)
                if (this.editorType !== 'text' && corner.model === 1) {
                    this.$emit('edit', 'setBorderRadius', corner.dir)
                }

            },
            touchstart() {
                var args = arguments
                var vm = this
                // console.log('touchstart')
                this.longtouchTimeout = setTimeout(() => {
                    vm.longtouch.apply(vm, args)
                }, 500)

            },
            touchmove() {
                this.cancelLongtouch()
            },
            touchend() {
                console.log('touchend')
                this.cancelLongtouch()
            },
            longtouch(evt) {
                // console.log(arguments)
                if (evt.target.nodeName !== 'SPAN') return
                this.focusWrapData.showRotate = true;

            },
            cancelLongtouch: function() {
                console.log(this.longtouchTimeout)
                clearTimeout(this.longtouchTimeout);
            },
            addCornersEvent: function() {
                var corners = this.$el.getElementsByClassName('corners')[0]
                var rotates = this.$el.getElementsByClassName('rotates')[0]
                var mask = this.$el.getElementsByClassName('mask')[0]
                var vm = this
                // 给各节点绑定事件
                var cornersEvent = new AlloyFinger(corners, {
                    // 按住拖动
                    pressMove: this.pressMoveCorner,
                    // 长按
                    longTap: this.longtouch,
                    // 双击
                    doubleTap: function() {
                        // console.log(vm.focusWrapData)

                    },
                    // 单击
                    tap: function() {
                        vm.changeModel()
                    }
                })
                // console.log(mask)
                var rotateEvents = new AlloyFinger(rotates, {
                    pressMove: this.pressMoveRotate,
                    touchStart: this.saveRotateDeg,
                    longTap: function () {
                      
                    },
                    touchend: function(){
                        console.log(222)
                    }
                })

                // v-finger:tap="changeModel"\
                //                 v-finger:touch-start="clickMask"\
                //                 v-finger:press-move="pressMove.bind(this,\'move\')"\
                var maskEvents = new AlloyFinger(mask, {
                    tap: this.changeModel,
                    touchStart: this.clickMask,
                    pressMove: this.pressMove.bind(this, 'move'),
                    longTap: function () {
                        // console.log(22222222)
                          vm.$emit('longtouch-mask')
                        // vm.focusWrapData.showTools = !vm.focusWrapData.showTools
                    }
                })
                // console.log(this.$el.getElementsByClassName('corners'))
            },
            changeModel: function() {
                console.log(1)
                if(!this.blockModel){
                    this.focusWrapData.model = this.focusWrapData.model === 1 ? 2 : 1;
                }
                
                this.focusWrapData.showRotate = false;
                this.focusWrapData.showTools = false;
            }
        },
        mounted() {
            var vm = this;
            this.$nextTick(function() {
                this.addCornersEvent()
            })
            // this.initCorners()
            // console.log(11111111111111111)
            // console.log(this)
        }
    }

    return editFocusWrap
})