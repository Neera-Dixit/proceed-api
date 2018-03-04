import dogwaterOptions from './dogwater';
import Inert from 'inert';
import Vision from 'vision';
import dogwater from 'dogwater';

const plugins = [{
	register: Inert 
}, {
	register: Vision
},{
	register: dogwater,
	options: dogwaterOptions
}];

export default plugins;