import { useState, useEffect } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function Search() {
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {isFetching && <p>Loading...</p>}
      {error && <p>Error occurred while searching.</p>}

      {data && (
        <div className="search-results">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((user) => (
              <div key={user.id} className="mt-4">
                <p>{user.username}</p>
              </div>
            ))
          ) : (
            <p className="mt-4">No user found with that username.</p>
          )}
        </div>
      )}
    </div>
  );
}
