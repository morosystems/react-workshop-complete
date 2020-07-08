import React, { FunctionComponent } from "react";
import { WorkerListHeader, WorkerList } from "components";
import {IState, IWorker, NoneOwnProps, WorkOccupation} from "types";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import {
  actionAssignUnemployedWorkerToWorkOccupationCreator,
  actionUnAssignWorkerFromFieldCreator
} from "../actions";
import { i18n } from "i18n";
import { getFieldWorkers, getUnEmployedWorkers } from "../selectors";

export type FieldWorkersProps = {
  workers: Array<IWorker>;
  msg: string;
  isAddDisabled: boolean;
  onAddClick: () => void;
  onRemoveClick: () => void;
};

export const FieldWorkersComponent: FunctionComponent<FieldWorkersProps> = ({
  workers,
  msg,
  isAddDisabled,
  onAddClick,
  onRemoveClick
}) => {
  return (
    <div>
      <WorkerListHeader
        title={msg}
        onAddClick={onAddClick}
        isAddDisabled={isAddDisabled}
        onRemoveClick={onRemoveClick}
        isRemoveDisabled={workers.length <= 0}
      />
      <WorkerList workers={workers} />
    </div>
  );
};

type StateProps = Pick<FieldWorkersProps, "msg" | "workers" | "isAddDisabled">;

const mapStateToProps: MapStateToProps<StateProps, NoneOwnProps, IState> = state => ({
  workers: getFieldWorkers(state),
  msg: i18n.getMessage(state, "field"),
  isAddDisabled: getUnEmployedWorkers(state).length <= 0
});

type DispatchProps = Pick<FieldWorkersProps, "onAddClick" | "onRemoveClick">;

const mapDispatchToProps: MapDispatchToProps<
  DispatchProps,
  NoneOwnProps
> = dispatch => ({
  onAddClick: () =>
    dispatch(
      actionAssignUnemployedWorkerToWorkOccupationCreator(WorkOccupation.field)
    ),
  onRemoveClick: () => dispatch(actionUnAssignWorkerFromFieldCreator())
});

export const FieldWorkers = connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldWorkersComponent);
