import LoginForm from "@/components/utils/LoginForm";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-10 min-h-screen bg-gradient-to-b from-white via-bgGreen to-bgBlue">
      <div className="flex flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
