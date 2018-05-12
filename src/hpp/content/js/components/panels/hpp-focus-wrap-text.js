define(['text!view/panels/hpp-focus-wrap-text.html'], function (html) {
	var TOOLS = {
		'unlock': [
			{
				type: 'unlock',
				name: '解锁'
			}
		],
		'text':[
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
        'fixed': [
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
        ]
	}

	return {
		name: 'hpp-focus-wrap-text',
		template: html,
		props: {
			editorData: {
				type: Object
			},
		},

		computed: {
			corners: function () {
				var width = this.editorData.width,
					height = this.editorData.height;
					obj = {
						cornerTop: {
							name: 'corner-top',
							dir: 'top',
							left: width / 2 - 3,
							top: -3
						},
						cornerLeft: {
							name: 'corner-Left',
							dir: 'left',
							left: - 3,
							top: height / 2 -3
						},
						cornerRight: {
							name: 'corner-right',
							dir: 'right',
							left: width  - 3,
							top: height / 2 - 3
						},
						cornerBottom: {
							name: 'corner-Bottom',
							dir: 'bottom',
							left: width / 2 - 3,
							top: height - 3
						},
						corner1: {
							name: 'corner1',
							dir: 'corner1',
							left: - 3,
							top: -3
						},
						corner2: {
							name: 'corner2',
							dir: 'corner2',
							left: width  - 3,
							top: -3
						},
						corner3: {
							name: 'corner3',
							dir: 'corner3',
							left: width - 3,
							top: height -3
						},
						corner4: {
							name: 'corner4',
							dir: 'corner4',
							left: - 3,
							top: height -3
						}
					}
				return obj;
			},
			
			width: function () {
				return this.editorData.width;	
			},
			height: function () {
				return this.editorData.height;	
			},
			lines: function () {
				var width = this.width,
					height = this.height;
				return {
					left: {
						name:'left',
						
					}
				}
			},
			left: function () {
				return this.editorData.left;
			},
			toolsBar: function () {
				var editorData = this.editorData
				if(editorData.locked){
					return TOOLS['unlock']
				}

				if(editorData.fixed){
					return TOOLS['fixed']
				}

				return TOOLS['text']
			},
			editToolsSize: function () {
				var width = this.toolsBar.length * 55;
				var left = this.width / 2  - width/2
					if(left + this.left < 0){
                        left = -left - this.left + left
                    }

                    if(left + this.left + width > window.innerWidth){
                        left = window.innerWidth - this.left - width
                    }
                    console.log(left)
                return {
                    left:left,
                    top:this.height / 2 - 13
                }
			}
		},
		created: function () {
			
		}
	}
})