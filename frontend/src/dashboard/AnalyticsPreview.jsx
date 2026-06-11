export default function AnalyticsPreview() {
  return (
    <section className="max-w-7xl mx-auto py-24 px-6">

      <h2 className="text-5xl font-bold text-center mb-16">
        Analytics Dashboard
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-semibold mb-6">
            Borrow Trends
          </h3>

          <div className="h-64 bg-white/5 rounded-2xl flex items-end gap-4 p-4">
            <div className="bg-primary h-24 w-full rounded"></div>
            <div className="bg-primary h-40 w-full rounded"></div>
            <div className="bg-primary h-32 w-full rounded"></div>
            <div className="bg-primary h-52 w-full rounded"></div>
            <div className="bg-primary h-44 w-full rounded"></div>
          </div>
        </div>

        <div className="grid gap-6">

          <div className="glass rounded-3xl p-6">
            <h4 className="text-gray-400">
              Active Readers
            </h4>
            <h2 className="text-4xl font-bold mt-2">
              10,248
            </h2>
          </div>

          <div className="glass rounded-3xl p-6">
            <h4 className="text-gray-400">
              Popular Books
            </h4>
            <h2 className="text-4xl font-bold mt-2">
              5,876
            </h2>
          </div>

          <div className="glass rounded-3xl p-6">
            <h4 className="text-gray-400">
              AI Recommendation Score
            </h4>
            <h2 className="text-4xl font-bold mt-2">
              96%
            </h2>
          </div>

        </div>

      </div>

    </section>
  );
}