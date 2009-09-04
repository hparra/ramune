default_run_options[:pty] = true
ssh_options[:forward_agent] = true

set :application, "ramune"

set :domain, "marco.calit2.uci.edu"
#set(:domain) do
#  host = Capistrano::CLI.ui.ask "host: "
#  host += ".calit2.uci.edu"
#end

# this does NOT deploy via git
set :scm, :none
set :repository, 'release/'
set :deploy_via, :copy

set(:user) do
  Capistrano::CLI.ui.ask "login: "
end
set :use_sudo, false
set :deploy_to, "/var/www/#{application}"

role :app, domain
role :web, domain
role :db,  domain, :primary => true

# deploy:setup OK
namespace :deploy do

  desc "Restart Application (not really)"
  task :restart, :roles => :app do
    # does nothing
  end
end