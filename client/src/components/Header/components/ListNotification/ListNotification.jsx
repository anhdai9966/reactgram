function ListNotification() {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2">
      <div className="absolute z-[1] top-4 -right-10">
        <div className="text-white absolute -top-3 right-8 z-[3]">
          <IconTriangle className="w-4 h-4" />
        </div>
        <div className="relative p-6 w-[300px] md:w-[500px] overflow-y-auto rounded-md bg-white shadow-[3px_3px_35px_rgba(0,0,0,0.12)]">
          <ul className="flex flex-col text-sm font-light text-[#262626]">
            <div className="flex justify-center">
              <IconSpinner12Spins className="w-6 h-6 animate-spinner12Spins" />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListNotification;
