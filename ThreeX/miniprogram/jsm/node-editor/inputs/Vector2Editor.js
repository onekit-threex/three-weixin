import { NumberInput, LabelElement } from '../../libs/flow.module.js';
import { BaseNode } from '../core/BaseNode.js';
import { UniformNode } from '../../nodes/Nodes.js';
const { Vector2 } = requirePlugin('ThreeX');

export class Vector2Editor extends BaseNode {

	constructor() {

		const node = new UniformNode( new Vector2() );

		super( 'Vector 2', 2, node );

		const onUpdate = () => {

			node.value.x = fieldX.getValue();
			node.value.y = fieldY.getValue();

		};

		const fieldX = new NumberInput().setTagColor( 'red' ).onChange( onUpdate );
		const fieldY = new NumberInput().setTagColor( 'green' ).onChange( onUpdate );

		this.add( new LabelElement( 'XY' ).add( fieldX ).add( fieldY ) );

	}

}
