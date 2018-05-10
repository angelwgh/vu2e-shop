// 拾色器组件

;
(function(root, factory) {
    root.colorPicker = factory(root)
})(this, function(root) {
   
    (function(root) {
        const hsv2hsl = function(hue, sat, val) {
            return [
                hue,
                (sat * val / ((hue = (2 - sat) * val) < 1 ? hue : 2 - hue)) || 0,
                hue / 2
            ];
        };

        // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
        // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
        const isOnePointZero = function(n) {
            return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
        };

        const isPercentage = function(n) {
            return typeof n === 'string' && n.indexOf('%') !== -1;
        };

        // Take input from [0, n] and return it as [0, 1]
        const bound01 = function(value, max) {
            if (isOnePointZero(value)) value = '100%';

            const processPercent = isPercentage(value);
            value = Math.min(max, Math.max(0, parseFloat(value)));

            // Automatically convert percentage into number
            if (processPercent) {
                value = parseInt(value * max, 10) / 100;
            }

            // Handle floating point rounding errors
            if ((Math.abs(value - max) < 0.000001)) {
                return 1;
            }

            // Convert into [0, 1] range if it isn't already
            return (value % max) / parseFloat(max);
        };

        const INT_HEX_MAP = { 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F' };

        const toHex = function({ r, g, b }) {
            const hexOne = function(value) {
                value = Math.min(Math.round(value), 255);
                const high = Math.floor(value / 16);
                const low = value % 16;
                return '' + (INT_HEX_MAP[high] || high) + (INT_HEX_MAP[low] || low);
            };

            if (isNaN(r) || isNaN(g) || isNaN(b)) return '';

            return '#' + hexOne(r) + hexOne(g) + hexOne(b);
        };

        const HEX_INT_MAP = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 };

        const parseHexChannel = function(hex) {
            if (hex.length === 2) {
                return (HEX_INT_MAP[hex[0].toUpperCase()] || +hex[0]) * 16 + (HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1]);
            }

            return HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1];
        };

        const hsl2hsv = function(hue, sat, light) {
            sat = sat / 100;
            light = light / 100;
            let smin = sat;
            const lmin = Math.max(light, 0.01);
            let sv;
            let v;

            light *= 2;
            sat *= (light <= 1) ? light : 2 - light;
            smin *= lmin <= 1 ? lmin : 2 - lmin;
            v = (light + sat) / 2;
            sv = light === 0 ? (2 * smin) / (lmin + smin) : (2 * sat) / (light + sat);

            return {
                h: hue,
                s: sv * 100,
                v: v * 100
            };
        };

        // `rgbToHsv`
        // Converts an RGB color value to HSV
        // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
        // *Returns:* { h, s, v } in [0,1]
        const rgb2hsv = function(r, g, b) {
            r = bound01(r, 255);
            g = bound01(g, 255);
            b = bound01(b, 255);

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s;
            let v = max;

            const d = max - min;
            s = max === 0 ? 0 : d / max;

            if (max === min) {
                h = 0; // achromatic
            } else {
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }

            return { h: h * 360, s: s * 100, v: v * 100 };
        };

        // `hsvToRgb`
        // Converts an HSV color value to RGB.
        // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
        // *Returns:* { r, g, b } in the set [0, 255]
        const hsv2rgb = function(h, s, v) {
            h = bound01(h, 360) * 6;
            s = bound01(s, 100);
            v = bound01(v, 100);

            const i = Math.floor(h);
            const f = h - i;
            const p = v * (1 - s);
            const q = v * (1 - f * s);
            const t = v * (1 - (1 - f) * s);
            const mod = i % 6;
            const r = [v, q, p, p, t, v][mod];
            const g = [t, v, v, q, p, p][mod];
            const b = [p, p, t, v, v, q][mod];

            return {
                r: Math.round(r * 255),
                g: Math.round(g * 255),
                b: Math.round(b * 255)
            };
        };

        function Color(options) {
            this._hue = 0;
            this._saturation = 100;
            this._value = 100;
            this._alpha = 100;

            this.enableAlpha = false;
            this.format = 'hex';
            this.value = '';

            options = options || {};

            for (let option in options) {
                if (options.hasOwnProperty(option)) {
                    this[option] = options[option];
                }
            }

            this.doOnChange();
        }

        Color.prototype = {
            constructor: Color,

            set(prop, value) {
                if (arguments.length === 1 && typeof prop === 'object') {
                    for (let p in prop) {
                        if (prop.hasOwnProperty(p)) {
                            this.set(p, prop[p]);
                        }
                    }

                    return;
                }

                this['_' + prop] = value;
                this.doOnChange();
            },

            get(prop) {
                return this['_' + prop];
            },

            toRgb() {
                return hsv2rgb(this._hue, this._saturation, this._value);
            },

            fromString(value) {
                if (!value) {
                    this._hue = 0;
                    this._saturation = 100;
                    this._value = 100;

                    this.doOnChange();
                    return;
                }

                const fromHSV = (h, s, v) => {
                    this._hue = Math.max(0, Math.min(360, h));
                    this._saturation = Math.max(0, Math.min(100, s));
                    this._value = Math.max(0, Math.min(100, v));

                    this.doOnChange();
                };

                if (value.indexOf('hsl') !== -1) {
                    const parts = value.replace(/hsla|hsl|\(|\)/gm, '')
                        .split(/\s|,/g).filter((val) => val !== '').map((val, index) => index > 2 ? parseFloat(val) : parseInt(val, 10));

                    if (parts.length === 4) {
                        this._alpha = Math.floor(parseFloat(parts[3]) * 100);
                    } else if (parts.length === 3) {
                        this._alpha = 100;
                    }
                    if (parts.length >= 3) {
                        const { h, s, v } = hsl2hsv(parts[0], parts[1], parts[2]);
                        fromHSV(h, s, v);
                    }
                } else if (value.indexOf('hsv') !== -1) {
                    const parts = value.replace(/hsva|hsv|\(|\)/gm, '')
                        .split(/\s|,/g).filter((val) => val !== '').map((val, index) => index > 2 ? parseFloat(val) : parseInt(val, 10));

                    if (parts.length === 4) {
                        this._alpha = Math.floor(parseFloat(parts[3]) * 100);
                    } else if (parts.length === 3) {
                        this._alpha = 100;
                    }
                    if (parts.length >= 3) {
                        fromHSV(parts[0], parts[1], parts[2]);
                    }
                } else if (value.indexOf('rgb') !== -1) {
                    const parts = value.replace(/rgba|rgb|\(|\)/gm, '')
                        .split(/\s|,/g).filter((val) => val !== '').map((val, index) => index > 2 ? parseFloat(val) : parseInt(val, 10));

                    if (parts.length === 4) {
                        this._alpha = Math.floor(parseFloat(parts[3]) * 100);
                    } else if (parts.length === 3) {
                        this._alpha = 100;
                    }
                    if (parts.length >= 3) {
                        const { h, s, v } = rgb2hsv(parts[0], parts[1], parts[2]);
                        fromHSV(h, s, v);
                    }
                } else if (value.indexOf('#') !== -1) {
                    const hex = value.replace('#', '').trim();
                    let r, g, b;

                    if (hex.length === 3) {
                        r = parseHexChannel(hex[0] + hex[0]);
                        g = parseHexChannel(hex[1] + hex[1]);
                        b = parseHexChannel(hex[2] + hex[2]);
                    } else if (hex.length === 6 || hex.length === 8) {
                        r = parseHexChannel(hex.substring(0, 2));
                        g = parseHexChannel(hex.substring(2, 4));
                        b = parseHexChannel(hex.substring(4, 6));
                    }

                    if (hex.length === 8) {
                        this._alpha = Math.floor(parseHexChannel(hex.substring(6)) / 255 * 100);
                    } else if (hex.length === 3 || hex.length === 6) {
                        this._alpha = 100;
                    }

                    const { h, s, v } = rgb2hsv(r, g, b);
                    fromHSV(h, s, v);
                }
            },

            compare(color) {
                return Math.abs(color._hue - this._hue) < 2 &&
                    Math.abs(color._saturation - this._saturation) < 1 &&
                    Math.abs(color._value - this._value) < 1 &&
                    Math.abs(color._alpha - this._alpha) < 1;
            },

            doOnChange() {
                const { _hue, _saturation, _value, _alpha, format } = this;

                if (this.enableAlpha) {
                    switch (format) {
                        case 'hsl':
                            const hsl = hsv2hsl(_hue, _saturation / 100, _value / 100);
                            this.value = `hsla(${ _hue }, ${ Math.round(hsl[1] * 100) }%, ${ Math.round(hsl[2] * 100) }%, ${ _alpha / 100})`;
                            break;
                        case 'hsv':
                            this.value = `hsva(${ _hue }, ${ Math.round(_saturation) }%, ${ Math.round(_value) }%, ${ _alpha / 100})`;
                            break;
                        default:
                            const { r, g, b } = hsv2rgb(_hue, _saturation, _value);
                            this.value = `rgba(${r}, ${g}, ${b}, ${ _alpha / 100 })`;
                    }
                } else {
                    switch (format) {
                        case 'hsl':
                            const hsl = hsv2hsl(_hue, _saturation / 100, _value / 100);
                            this.value = `hsl(${ _hue }, ${ Math.round(hsl[1] * 100) }%, ${ Math.round(hsl[2] * 100) }%)`;
                            break;
                        case 'hsv':
                            this.value = `hsv(${ _hue }, ${ Math.round(_saturation) }%, ${ Math.round(_value) }%)`;
                            break;
                        case 'rgb':
                            const { r, g, b } = hsv2rgb(_hue, _saturation, _value);
                            this.value = `rgb(${r}, ${g}, ${b})`;
                            break;
                        default:
                            this.value = toHex(hsv2rgb(_hue, _saturation, _value));
                    }
                }
            }
        };
        root.Color = Color
    })(root)
 	var Color = root.Color;
    console.log(Color)

    var isDragging = false;

    function draggable(element, options) {
        if (Vue.prototype.$isServer) return;
        const moveFn = function(event) {
        	event.preventDefault()
            if (options.drag) {
                options.drag(event);
            }
        };
        const upFn = function(event) {
            document.removeEventListener('touchmove', moveFn);
            document.removeEventListener('touchend', upFn);
            document.onselectstart = null;
            document.ondragstart = null;

            isDragging = false;

            if (options.end) {
                options.end(event);
            }
        };
        element.addEventListener('touchstart', function(event) {
            if (isDragging) return;
            document.onselectstart = function() { return false; };
            document.ondragstart = function() { return false; };

            document.addEventListener('touchmove', moveFn);
            document.addEventListener('touchend', upFn);
            isDragging = true;

            if (options.start) {
                options.start(event);
            }
        });
    }

    var HueSlider = {
        template: '<div class="el-color-hue-slider" :class="{ \'is-vertical\': vertical }">\
				    <div class="el-color-hue-slider__bar" @click="handleClick" ref="bar"></div>\
				    <div class="el-color-hue-slider__thumb"\
				         :style="{\
				           left: thumbLeft + \'px\',\
				           top: thumbTop + \'px\'\
				         }"\
				         ref="thumb">\
				    </div>\
				  </div>',
        name: 'el-color-hue-slider',

        props: {
            color: {
                required: true
            },

            vertical: Boolean
        },

        data() {
            return {
                thumbLeft: 0,
                thumbTop: 0
            };
        },

        computed: {
            hueValue() {
                const hue = this.color.get('hue');
                return hue;
            }
        },

        watch: {
            hueValue() {
                this.update();
            }
        },

        methods: {
            handleClick(event) {
                const thumb = this.$refs.thumb;
                const target = event.target;

                if (target !== thumb) {
                    this.handleDrag(event);
                }
            },

            handleDrag(event, touchType) {
                const rect = this.$el.getBoundingClientRect();
                const { thumb } = this.$refs;
                let hue;
                const touches = touchType === 'drag' ? event.targetTouches[0] : event.changedTouches[0]

                if (!this.vertical) {
                    let left = touches.clientX - rect.left;
                    left = Math.min(left, rect.width - thumb.offsetWidth / 2);
                    left = Math.max(thumb.offsetWidth / 2, left);

                    hue = Math.round((left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth) * 360);
                } else {
                    let top = touches.clientY - rect.top;
                    top = Math.min(top, rect.height - thumb.offsetHeight / 2);
                    top = Math.max(thumb.offsetHeight / 2, top);

                    hue = Math.round((top - thumb.offsetHeight / 2) / (rect.height - thumb.offsetHeight) * 360);
                }

                this.color.set('hue', hue);
            },

            getThumbLeft() {
                if (this.vertical) return 0;
                const el = this.$el;
                const hue = this.color.get('hue');

                if (!el) return 0;
                const thumb = this.$refs.thumb;
                return Math.round(hue * (el.offsetWidth - thumb.offsetWidth / 2) / 360);
            },

            getThumbTop() {
                if (!this.vertical) return 0;
                const el = this.$el;
                const hue = this.color.get('hue');

                if (!el) return 0;
                const thumb = this.$refs.thumb;
                return Math.round(hue * (el.offsetHeight - thumb.offsetHeight / 2) / 360);
            },

            update() {
                this.thumbLeft = this.getThumbLeft();
                this.thumbTop = this.getThumbTop();
            }
        },

        mounted() {
            console.log(this.vertical)
            const { bar, thumb } = this.$refs;

            const dragConfig = {
                drag: (event) => {
                    this.handleDrag(event, 'drag');
                },
                end: (event) => {
                    this.handleDrag(event, 'end');
                }
            };

            draggable(bar, dragConfig);
            draggable(thumb, dragConfig);
            this.update();
        }
    }

    var SvPanel = {
        template: '<div class="el-color-svpanel"\
				      :style="{\
				        backgroundColor: background\
				      }">\
				    <div class="el-color-svpanel__white"></div>\
				    <div class="el-color-svpanel__black"></div>\
				    <div class="el-color-svpanel__cursor"\
				      :style="{\
				        top: cursorTop + \'px\',\
				        left: cursorLeft + \'px\'\
				      }">\
				      <div></div>\
				    </div>\
				  </div>',
        name: 'el-sl-panel',

        props: {
            color: {
                required: true
            }
        },

        computed: {
            colorValue() {
                const hue = this.color.get('hue');
                const value = this.color.get('value');
                return { hue, value };
            }
        },

        watch: {
            colorValue() {
                this.update();
            }
        },

        methods: {
            update() {
                const saturation = this.color.get('saturation');
                const value = this.color.get('value');

                const el = this.$el;
                let { width, height } = el.getBoundingClientRect();

                if (!height) height = width * 3 / 4;

                this.cursorLeft = saturation * width / 100;
                this.cursorTop = (100 - value) * height / 100;

                this.background = 'hsl(' + this.color.get('hue') + ', 100%, 50%)';
            },

            handleDrag(event, touchType) {
                const el = this.$el;
                const rect = el.getBoundingClientRect();
                const touches = touchType === 'drag' ? event.targetTouches[0] : event.changedTouches[0]


                let left = touches.clientX - rect.left;
                let top = touches.clientY - rect.top;
                left = Math.max(0, left);
                left = Math.min(left, rect.width);

                top = Math.max(0, top);
                top = Math.min(top, rect.height);


                this.cursorLeft = left;
                this.cursorTop = top;
                this.color.set({
                    saturation: left / rect.width * 100,
                    value: 100 - top / rect.height * 100
                });
            }
        },

        mounted() {
            draggable(this.$el, {
                drag: (event) => {
                    this.handleDrag(event, 'drag');
                },
                end: (event) => {
                    this.handleDrag(event, 'end');
                }
            });

            this.update();
        },

        data() {
            return {
                cursorTop: 0,
                cursorLeft: 0,
                background: 'hsl(0, 100%, 50%)'
            };
        }
    }


    var PickerDropdown = {
        template: '<div class="el-color-dropdown">\
		      <div class="el-color-dropdown__main-wrapper">\
		        <hue-slider ref="hue" :color="color"></hue-slider>\
		        <sv-panel ref="sl" :color="color"></sv-panel>\
		      </div>\
		    </div>',
        name: 'el-color-picker-dropdown',

        // mixins: [Popper, Locale],

        components: {
            SvPanel,
            HueSlider,
            // AlphaSlider,
            // Predefine
        },

        props: {
            color: {
                required: true
            },
            showAlpha: Boolean,
            predefine: Array
        },

        data() {
            return {
                customInput: ''
            };
        },

        computed: {
            currentColor() {
                const parent = this.$parent;
                return !parent.value && !parent.showPanelColor ? '' : parent.color.value;
            }
        },

        methods: {
            confirmValue() {
                this.$emit('pick');
            },

            handleConfirm() {
                this.color.fromString(this.customInput);
            }
        },

        mounted() {
            this.$parent.popperElm = this.popperElm = this.$el;
            this.referenceElm = this.$parent.$el;
        },

        watch: {
            showPopper(val) {
                if (val === true) {
                    this.$nextTick(() => {
                        const { sl, hue, alpha } = this.$refs;
                        sl && sl.update();
                        hue && hue.update();
                        alpha && alpha.update();
                    });
                }
            },

            currentColor(val) {
                this.customInput = val;
            }
        }

    }

    var colorPicker = {
        template: '<div class="m-color-picker">\
		    <div class="el-color-picker__mask" v-if="colorDisabled"></div>\
		    <picker-dropdown\
		       ref="dropdown"\
		       :class="[\'el-color-picker__panel\', popperClass || \'\']"\
		       v-model="showPicker"\
		       @pick="confirmValue"\
		       @clear="clearValue"\
		       :color="color"\
		       :show-alpha="showAlpha"\
		       :predefine="predefine">\
		    </picker-dropdown>\
		  </div>',
        name: 'ElColorPicker',
        props: {
            value: String,
            showAlpha: Boolean,
            colorFormat: String,
            disabled: Boolean,
            size: String,
            popperClass: String,
            predefine: Array
        },

        inject: {
            elForm: {
                default: ''
            },
            elFormItem: {
                default: ''
            }
        },
        computed: {
            displayedColor() {
                if (!this.value && !this.showPanelColor) {
                    return 'transparent';
                } else {
                    const { r, g, b } = this.color.toRgb();
                    return this.showAlpha ?
                        `rgba(${ r }, ${ g }, ${ b }, ${ this.color.get('alpha') / 100 })` :
                        `rgb(${ r }, ${ g }, ${ b })`;
                }
            },

            _elFormItemSize() {
                return (this.elFormItem || {}).elFormItemSize;
            },

            colorSize() {
                return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
            },

            colorDisabled() {
                return this.disabled || (this.elForm || {}).disabled;
            }
        },

        watch: {
            value(val) {
                if (!val) {
                    this.showPanelColor = false;
                } else if (val && val !== this.color.value) {
                    this.color.fromString(val);
                }
            },
            color: {
                deep: true,
                handler() {
                    this.showPanelColor = true;
                }
            },
            displayedColor(val) {
                this.$emit('active-change', val);
            }
        },

        methods: {
            handleTrigger() {
                if (this.colorDisabled) return;
                this.showPicker = !this.showPicker;
            },
            confirmValue(value) {
                this.$emit('input', this.color.value);
                this.$emit('change', this.color.value);
                this.showPicker = false;
            },
            clearValue() {
                this.$emit('input', null);
                this.$emit('change', null);
                this.showPanelColor = false;
                this.showPicker = false;
                this.resetColor();
            },
            hide() {
                this.showPicker = false;
                this.resetColor();
            },
            resetColor() {
                this.$nextTick(_ => {
                    if (this.value) {
                        this.color.fromString(this.value);
                    } else {
                        this.showPanelColor = false;
                    }
                });
            }
        },

        mounted() {
            const value = this.value;
            if (value) {
                this.color.fromString(value);
            }
            this.popperElm = this.$refs.dropdown.$el;
        },

        data() {
            const color = new Color({
                enableAlpha: this.showAlpha,
                format: this.colorFormat
            });
            return {
                color,
                showPicker: false,
                showPanelColor: false
            };
        },

        components: {
            PickerDropdown
        }
    }


    return {
        components: {
            'my-color-picker': colorPicker
        },
        template: '<div class="m-color-picker-g">\
				  		<div class="color-show"\
				  			 :style="{\
								backgroundColor:currentColor\
				  			 }"></div>\
				  		<my-color-picker v-model="currentColor"\
				  			\
				  			v-on:active-change="change"></my-color-picker>\
				  		<div class="btns">\
				  			<button class="primary" v-on:click="click">完成编辑</button>\
				  		</div>\
				  </div>',
        data: function() {
            return {
                currentColor:null,
            }
        },
        methods: {
        	change: function (val) {
	        	// console.log(this.currentColor)
	        	this.currentColor = val
	        },
	        click: function(){
	        	this.$emit('change', this.currentColor)
	        }
    	}
    }
})