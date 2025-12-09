"use client";
import React from "react";
import BaseField from "../BaseField/BaseField";
import Combobox from "../Combobox/Combobox";
import Form from "../Form/Form";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-primary-500 m-4">
        خودرو خودتان را انتخاب کنید!
      </h1>
      <p className="text-2xl m-4">تا شمع مناسب خودروی شما را پیدا کنیم</p>

      <Form
        onSubmit={() => {}}
        className="inline-flex justify-start items-center gap-4 w-full mt-4"
      >
        <BaseField
          containerClassName="min-w-2xs"
          className="bg-primary-50"
          component={Combobox}
          name="brandName"
          label="برند ماشین"
        />
        <BaseField
          containerClassName="min-w-2xs"
          className="bg-primary-50"
          component={Combobox}
          name="brandName"
          label="مدل ماشین"
        />
        <BaseField
          containerClassName="min-w-2xs"
          className="bg-primary-50"
          component={Combobox}
          name="brandName"
          label="سال تولید"
        />

        <Button className="mt-6 min-w-72" variant={"secondary"}>
          جستوجو
        </Button>
      </Form>
    </>
  );
};

export default Hero;
