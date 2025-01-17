import React, { useEffect, useMemo } from 'react';
import { FileType } from '../Editor/type';
import { Image, Skeleton } from '@nextui-org/react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Icon } from '@iconify/react';
import { DeleteIcon, DownloadIcon } from './icons';
import { observer } from 'mobx-react-lite';
import { RootStore } from '@/store';

type IProps = {
  files: FileType[]
  preview?: boolean
  columns?: number
}

const ImageRender = observer((props: IProps) => {
  const { files, preview = false, columns = 3 } = props
  const images = files?.filter(i => i.previewType == 'image')

  const imageRenderClassName = useMemo(() => {
    const imageLength = files?.filter(i => i.previewType == 'image')?.length
    if (imageLength == 1) {
      return `flex`
    }
    if (imageLength > 1 && imageLength < 5) {
      return `grid grid-cols-2 gap-2`
    }
    if (imageLength > 5) {
      return `grid grid-cols-3 gap-2`
    }
    return ''
  }, [images])

  const imageHeight = useMemo(() => {
    const imageLength = files?.filter(i => i.previewType == 'image')?.length
    if (imageLength == 1) {
      return `h-auto`
    }
    if (imageLength > 1 && imageLength < 5) {
      return `md:h-[180px] h-[160px]`
    }
    if (imageLength > 5) {
      return `lg:h-[160px] md:h-[120px] h-[100px]`
    }
    return ''
  }, [images])


  return <div className={imageRenderClassName}>
    <PhotoProvider>
      {images.map((file, index) => (
        <div className={`relative group w-full ${imageHeight}`}>
          {file.uploadPromise?.loading?.value && <div className='absolute inset-0 flex items-center justify-center w-full h-full'>
            <Icon icon="line-md:uploading-loop" width="40" height="40" />
          </div>}
          <div className='w-full'>
            <PhotoView src={file.preview}>
              <Image src={file.preview.replace('/api/file/','/api/file/thumbnail_')} fallbackSrc={file.preview} style={{ borderRadius: '13px' }} className={`rounded-xl mb-4 ${imageHeight} object-cover w-[1000px]`} />
            </PhotoView>
          </div>
          {!file.uploadPromise?.loading?.value && !preview &&
            <DeleteIcon className='absolute z-10 right-[5px] top-[5px]' files={files} file={file} />
          }
          {preview && <DownloadIcon file={file} />
          }
        </div>
      ))}
    </PhotoProvider>
  </div>
})

export { ImageRender }