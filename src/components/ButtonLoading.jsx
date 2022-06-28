import React from 'react';
import { Button, Spinner } from 'flowbite-react';
const ButtonLoading = () => {
  return (
    <div className="flex flex-row gap-3 w-full justify-center items-center">
      <Button color="blue">
        <Spinner aria-label="Spinner" />
        <span className="pl-3">Loading...</span>
      </Button>
    </div>
  );
};

export default ButtonLoading;
