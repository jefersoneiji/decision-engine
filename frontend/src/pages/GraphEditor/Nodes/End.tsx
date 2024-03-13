import { Handle, NodeProps, Position } from "reactflow";

import { NodeWrapper } from "./NodeWrapper";
import { useContext } from "react";
import { DrawerName, editor } from "../Editor";

type EndNodeData = {
  width: number;
  height: number;
  decision: string;
};

export function EndNode({ data, id: nodeId }: NodeProps<EndNodeData>) {
  const { showDrawer } = useContext(editor)
  
  const onShowDrawer = () => {
    const { decision } = data
    showDrawer(
      DrawerName.editDecisionNode,
      {
        id: nodeId,
        decision
      }
    )
  }
  return (
    <NodeWrapper>
      <div
        className={`rounded-full aspect-square flex items-center justify-center border-4 border-N-400 h-full bg-white text-[12px] cursor-pointer`}
        style={{
          width: data.width,
          height: data.height,
        }}
        onClick={onShowDrawer}
      >
        <Handle
          type="target"
          id="target"
          className="invisible"
          position={Position.Top}
          isConnectable={false}
        />
        <p className="font-medium">{data.decision}</p>
      </div>
    </NodeWrapper>
  );
}
