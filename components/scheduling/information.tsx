// StepPersonalInfo.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "../ui/input";
import { RootState } from "@/store/store";
import { selectPersonalInfo } from "@/store/formSlice"; // Adjust path as needed

const StepPersonalInfo: React.FC = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Selecting specific fields from Redux state
  const { name, email, phone } = useSelector(
    (state: RootState) => state.formSlice
  );

  // Handle input change for name, email, and phone
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;
    // Dispatch action to update Redux state
    dispatch(
      selectPersonalInfo({
        name,
        email,
        phone,
        [inputName]: value,
      })
    );
  };

  return (
    <div>
      <label>
        Name:
        <Input
          {...register("name")}
          value={name}
          onChange={handleInputChange}
        />
        {errors.name && <span>{`${errors.name.message}`}</span>}
      </label>
      <label>
        Email:
        <Input
          {...register("email")}
          value={email}
          onChange={handleInputChange}
        />
        {errors.email && <span>{`${errors.email.message}`}</span>}
      </label>
      <label>
        Phone:
        <Input
          {...register("phone")}
          value={phone}
          onChange={handleInputChange}
        />
        {errors.phone && <span>{`${errors.phone.message}`}</span>}
      </label>
    </div>
  );
};

export default StepPersonalInfo;
