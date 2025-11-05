import React from "react";
import { useAppContext } from "../Context";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { FormValues } from "../types/formTypes";

const Form = () => {
  const { times, months, initialFormValues, onValueSubmit, scheduleData } =
    useAppContext();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: initialFormValues,
  });

  const onSubmit: SubmitHandler<FormValues> = React.useCallback(
    (values) => {
      onValueSubmit?.(values);
    },
    [onValueSubmit]
  );

  const years = React.useMemo(() => {
    const date = new Date();
    const currentYear = date.getFullYear();
    return Array.from({ length: 2 }, (_, i) => {
      const year = currentYear + i;
      return { label: year, value: year };
    });
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 flex flex-col h-full justify-between"
    >
      <div className="w-full flex flex-col gap-4">
        <div className="">
          <div className="text-lg text-black font-bold">Settings</div>
        </div>

        <div className="flex flex-col gap-4">
          <Group label="Year">
            <select
              {...register("year")}
              className="bg-neutral-100 rounded-sm px-3 h-10 w-full border border-neutral-300 outline-0"
            >
              {years.map((d, i) => (
                <option key={i} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </Group>

          <Group label="Month">
            <select
              {...register("month")}
              className="bg-neutral-100 rounded-sm px-3 h-10 w-full border border-neutral-300 outline-0"
            >
              {months?.map((d, i) => (
                <option key={i} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </Group>

          <Group label="Start time">
            <select
              {...register("time")}
              className="bg-neutral-100 rounded-sm px-3 h-10 w-full border border-neutral-300 outline-0"
            >
              {times?.map((d, i) => (
                <option key={i} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </Group>

          <Group label="Member shuffle dept">
            <select
              {...register("memberDepth")}
              className="bg-neutral-100 rounded-sm px-3 h-10 w-full border border-neutral-300 outline-0"
            >
              {Array(17)
                .fill("")
                .map((_, i) => (
                  <option key={i} value={i}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
            </select>
          </Group>

          <Group label="Zone shuffle">
            <select
              {...register("zoneDepth")}
              className="bg-neutral-100 rounded-sm px-3 h-10 w-full border border-neutral-300 outline-0"
            >
              <option value="0">ASC</option>
              <option value="1">DESC</option>
            </select>
          </Group>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <button className="bg-black p-3 font-medium text-sm rounded-md text-white cursor-pointer hover:bg-neutral-700">
          Generate
        </button>
      </div>
    </form>
  );
};

export default Form;

type GProps = {
  label: string;
  children: React.ReactNode;
};
function Group({ label, children }: GProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-neutral-600 text-sm font-medium">{label}</label>
      <div className="w-full">{children}</div>
    </div>
  );
}
