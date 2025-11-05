import { useAppContext } from "../Context";
import { to12Hour } from "../helper";

const Table = () => {
  const { scheduleData } = useAppContext();

  return (
    <div className="flex flex-col gap-8 px-12">
      {scheduleData?.map((d, i) => {
        return (
          <>
            <div key={i} className="flex flex-col gap-3 print:my-8">
              <div className="text-md font-bold text-blue-600">{d.zone}</div>
              <div className="flex flex-col gap-0 ">
                {d.items.map((s, index) => {
                  return (
                    <div
                      className="px-0 py-3 print:py-3 first:border-t border-b border-neutral-200 flex justify-between items-center "
                      key={index}
                    >
                      <div className="font-medium flex text-sm ">{s.name}</div>

                      <div className="text-right text-sm ">
                        <span className="text-blue-800 font-medium leading-none">
                          {to12Hour(s.start)}
                        </span>
                        &nbsp;&nbsp;-&nbsp;&nbsp;
                        <span className="text-blue-800 font-medium leading-none">
                          {to12Hour(s.end)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {i < scheduleData.length - 1 ? (
              <div className="hidden print:block print:break-after-page"></div>
            ) : null}
          </>
        );
      })}
    </div>
  );
};

export default Table;
