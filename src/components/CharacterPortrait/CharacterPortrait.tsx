import { useEffect, useState, FC } from 'react';
import { imageFormatIsSupported } from '@utils/helpers/isSupportedImageFormat';
import { ReactComponent as Placeholder } from '@assets/svg/user_placeholder.svg';
import Spinner from '@components/Spinner/Spinner';
import { toast } from 'react-toastify';

type CharacterPortraitProps = {
  isDead?: boolean;
  imgSrc?: string;
  className?: string;
};

const CharacterPortrait: FC<CharacterPortraitProps> = ({ isDead = false, imgSrc, className }) => {
  return (
    <div
      className={`relative shrink-0 overflow-hidden 
        ${className ? className : 'w-full h-full'} 
        ${isDead && imgSrc ? 'bg-neutral-300 grayscale contrast-50' : 'bg-neutral-100'}
      `}
    >
      <div className='absolute inset-0 text-center'>
        {imgSrc ? (
          <img
            loading='lazy'
            src={imgSrc}
            alt='Character Portrait Icon'
            className='h-full w-full object-cover object-top'
          />
        ) : (
          <Placeholder className='h-full w-full object-cover stroke-white' />
        )}
      </div>
    </div>
  );
};

export default CharacterPortrait;
