import { FC, ReactNode } from 'react';
import classNames from 'classnames';

interface IAction {
  type: 'main' | 'secondary';
  text: string;
  action: any;
  withCloseButton?: boolean;
}

interface IProps {
  text: string;
  actions: IAction[];
  children?: ReactNode;
}

export const ModalComponent: FC<IProps> = ({ text, actions, children }) => {
  return (
    <div
      className={
        'z-10 top-0 left-0 fixed w-screen h-screen flex items-center justify-center bg-blackRBGA'
      }
    >
      <div
        className={'w-[250px] h-[120px] bg-amber-50 border-2 p-2 text-center'}
      >
        <p>{text}</p>
        {children}
        <div className={'flex gap-4 justify-center mt-4'}>
          {actions.map((el) => (
            <button
              onClick={el.action}
              className={classNames('p-2 pl-4 pr-4 text-white border-0', {
                ['bg-emerald-600']: el.type === 'main',
                ['bg-red']: el.type === 'secondary',
              })}
            >
              {el.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
