import { useContext } from 'react'
import { DiamondSvg } from "assets/Diamond";
import { Handle, NodeProps, Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";
import { DrawerName, editor } from "../Editor";

export type ConditionalNodeData = {
  label: string;
  elseLabel?: string;
  parameter: string;
  operation: string;
  value: number;
  width: number;
  height: number;
};

export function ConditionalNode({ data, id }: NodeProps<ConditionalNodeData>) {
  const { showDrawer } = useContext(editor)

  const onShowDrawer = () => {
    const { label, operation, parameter, value } = data
    showDrawer(
      DrawerName.editNode,
      {
        id,
        parameter,
        operation,
        value,
        label
      }
    )
  }
  return (
    <NodeWrapper>
      <div
        className="w-full h-full group"
        style={{
          width: data.width,
          height: data.height,
        }}
      >
        <div className="p-9 flex items-center justify-center text-[12px] text-center w-full h-full relative">
          <div
            className={`group-hover-focus:cursor-pointer absolute left-0 top-0 w-full h-full text-Y-300 [&>svg]:stroke-Y-600 group-hover:text-Y-350 z-0`}
          >
            <DiamondSvg strokeWidth={4} onClick={onShowDrawer} />
          </div>
          <Handle
            type="target"
            id="target"
            className="invisible"
            position={Position.Top}
            isConnectable={false}
          />
          <p className={`cursor-pointer line-clamp-3 z-10`}>{data.label}</p>
          <Handle
            type="source"
            id="source"
            className="invisible"
            position={Position.Bottom}
            isConnectable={false}
          />
        </div>
      </div>
    </NodeWrapper>
  );
}
