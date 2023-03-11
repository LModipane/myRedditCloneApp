import React, { useState } from 'react';

function useSelectImage() {
	const [selectedFile, setSelectedFile] = useState<string>('');

	const handleSelectedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();
		if (event.target.files?.[0]) reader.readAsDataURL(event.target.files[0]);
		reader.onload = readerEvent => {
			if (readerEvent.target?.result)
				setSelectedFile(readerEvent.target.result as string);
		};
	};
	return { handleSelectedImage, selectedFile, setSelectedFile };
}

export default useSelectImage;
