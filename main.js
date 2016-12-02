// gr(function(){
// 	var $$ = gr("#main");
// 	setTimeout(function(){
// 		$$("mesh").setAttribute("scale", "2, 2, 1");
// 	}, 1000);
// });

// gr(function() {
//     var $$ = gr("#main");
//     for (var i = -5; i < 5; i++) {
//         for (var j = -5; j < 5; j++) {
//             $$("scene").append('<mesh geometry="quad" scale="0.4" position="' + i + ',' + j + ',0" texture="1301581014.jpg" />');
//         }
//     }
//     rotation();
// });
// var ratio = 0;

// function rotation() {
//     gr('#main')('mesh').setAttribute('rotation', ratio + ',' + ratio + ',' + ratio);
//     ratio += 1;
//     requestAnimationFrame(rotation);
// }

gr.registerComponent('Rotation', {
	attributes: {
		speed: {
			defaultValue: '1',
			converter: 'Number',
		},
		initialValue: {
			defaultValue: '0',
			converter: 'Number',
		}
	},
	$mount: function() {
		this.phi = this.getValue('initialValue');
	},
	$update: function() {
		this.phi += this.getValue('speed');
		this.node.setAttribute('rotation', 0 + ',' + this.phi + ',' + 0);
		// console.log(this.phi);
	},
});

gr.registerComponent('Revolution', {
	attributes: {
		speed: {
			defaultValue: '1',
			converter: 'Number',
		},
		radius: {
			defaultValue: '1',
			converter: 'Number',
		}
	},
	$mount: function() {
		this.phi = 0;
		this.rad = this.getValue('radius');
	},
	$update: function() {
		this.phi += this.getValue('speed') * Math.PI / 180;
		this.node.setAttribute('position', this.rad * Math.sin(this.phi) + ',' + 0 + ',' + this.rad * Math.cos(this.phi));
		// console.log(this.rad * Math.sin(this.phi) + ',' + 0 + ',' + this.rad * Math.cos(this.phi));
		// console.log(this.phi);
	},
});

function onSpeedChange(v){
	// console.log(v.value);
	gr("#main")("#earth")("Rotation").setAttribute("speed", v.value / 25 * 5);
	gr("#main")("#moon")("Rotation").setAttribute("speed", v.value / 25 * 0.183);
	gr("#main")("#moon")("Revolution").setAttribute("speed", v.value / 25 * 0.183);
}

/*

https://grimoiregl.github.io/grimoire.gl-example/#phongのなちゃら.jsをコピって、月を四角いやつの子にしちゃえばいいんじゃね？
				-----by むーさん

*/

gr(function(){
	var $$ = gr("#main");
	// $$('mesh').addComponent('Rotation');
	onSpeedChange(document.getElementsByTagName("input")[0]);
});

