export const goalSelect = (data) => {
    console.log('goal-actions-data>>', data);
    return {
      type: 'GOAL_SELECT',
      payload: {
        current_goal: data.current_goal
      }
    }
  }