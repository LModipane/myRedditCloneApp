import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Checkbox: ComponentStyleConfig = {
	baseStyle: {
		icon: {
			color: 'white',
		},
		control: {
			border: '1px',
			borderColor: 'gray.300',
			borderRadius: 'base',
			_disabled: {
				borderColor: 'gray.300',
				bg: 'gray.200',
			},
		},
		label: {
			fontWeight: 'medium',
			color: 'gray.900',
		},
	},
};
