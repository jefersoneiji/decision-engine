import { useContext } from 'react';

import { DrawerName, editor } from '../Editor';
import { ChooseNodeDrawer } from './ChooseNode/ChooseNode';
import { EditNodeDrawer } from './EditNode/EditNode';
import { EditDecisionNodeDrawer } from './EditNode/EditDecisionNode';
import { EditPolicyDrawer } from './EditPolicy/EditPolicy';

export type CommonDrawerProps = {
  id?: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const drawers = {
  [DrawerName.newNode]: ChooseNodeDrawer,
  [DrawerName.editNode]: EditNodeDrawer,
  [DrawerName.editDecisionNode]: EditDecisionNodeDrawer,
  [DrawerName.editPolicy]: EditPolicyDrawer
} satisfies Record<DrawerName, (props: never) => JSX.Element>;

export const CurrentDrawer = () => {
  const { drawerName, drawerProps } = useContext(editor);
  const Drawer = drawers[drawerName];

  return <Drawer key={drawerProps.id} {...drawerProps} />;
};
