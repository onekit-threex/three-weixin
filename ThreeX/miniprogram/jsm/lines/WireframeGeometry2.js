
import { LineSegmentsGeometry } from '../lines/LineSegmentsGeometry.js';
const {
	WireframeGeometry
} = requirePlugin('ThreeX');
class WireframeGeometry2 extends LineSegmentsGeometry {

	constructor( geometry ) {

		super();

		this.isWireframeGeometry2 = true;

		this.type = 'WireframeGeometry2';

		this.fromWireframeGeometry( new WireframeGeometry( geometry ) );

		// set colors, maybe

	}

}

export { WireframeGeometry2 };
